import { handleEden } from '@/utils';
import type { EdenFetchError } from 'custom';
import { t } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';
import { createElysia } from '../elysias';

const memberSchema = t.Object({
  profileId: t.String(),
  resumeId: t.String(),
  chapterId: t.String(),
});

const eventSchema = t.Object({
  name: t.String(),
  description: t.Optional(t.String()),
  startDate: t.String(), // Will be converted to DateTime
  endDate: t.String(), // Will be converted to DateTime
  location: t.String(),
  type: t.String(),
  status: t.String(),
  chapterId: t.Optional(t.String()),
});

const resourceSchema = t.Object({
  title: t.String(),
  type: t.String(),
  url: t.String(),
  description: t.Optional(t.String()),
  category: t.String(),
  tags: t.Array(t.String()),
  chapterId: t.Optional(t.String()),
});

const chapterSchema = t.Object({
  name: t.String(),
  greekName: t.String(),
  foundingDate: t.String(), // Will be converted to DateTime
  university: t.String(),
  location: t.String(),
  status: t.String(),
  latitude: t.Number(),
  longitude: t.Number(),
});

const memberUpdateSchema = t.Object({
  resumeId: t.Optional(t.String()),
  chapterId: t.Optional(t.String()),
});

const eventUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
  startDate: t.Optional(t.String()),
  endDate: t.Optional(t.String()),
  location: t.Optional(t.String()),
  type: t.Optional(t.String()),
  status: t.Optional(t.String()),
});

const resourceUpdateSchema = t.Object({
  title: t.Optional(t.String()),
  type: t.Optional(t.String()),
  url: t.Optional(t.String()),
  description: t.Optional(t.String()),
  category: t.Optional(t.String()),
  tags: t.Optional(t.Array(t.String())),
  chapterId: t.Optional(t.String()),
});

const chapterUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  greekName: t.Optional(t.String()),
  university: t.Optional(t.String()),
  location: t.Optional(t.String()),
  status: t.Optional(t.String()),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
});

const rsvpSchema = t.Object({
  status: t.String(),
});

export const api = createElysia({ prefix: '/api' })
  .use(
    rateLimit({
      duration: 60000,
      max: 100,
      headers: true,
      scoping: 'scoped',
      countFailedRequest: true,
      skip: (req) => {
        const path = new URL(req.url).pathname;
        return (
          path.startsWith('/api/metrics') ||
          path.startsWith('/api/health') ||
          path.startsWith('/api/og')
        );
      },
      errorResponse: new Response(
        JSON.stringify({
          error: 'Too many requests',
          status: 429,
        }),
        { status: 429 },
      ),
    }),
  )

  // Members
  /**
   * Searches for members based on query parameters.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.query - The query parameters.
   * @returns {Object} The response object containing members data.
   */
  .get('/members/search', async ({ db, query }) => {
    try {
      const { search, chapter, active } = query;

      const members = await db.member.findMany({
        where: {
          AND: [
            search
              ? {
                  profile: {
                    user: { name: { contains: search, mode: 'insensitive' } },
                  },
                }
              : {},
            chapter ? { chapterId: chapter } : {},
            active !== undefined
              ? {
                  profile: { active: Boolean(active) },
                }
              : {},
          ],
        },
        include: {
          profile: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
              address: true,
            },
          },
          resume: true,
          chapter: true,
        },
      });

      return { data: members, error: null, status: 200 };
    } catch (error) {
      return {
        data: null,
        error: {
          message: error instanceof Error ? error.message : 'Internal server error',
        },
        status: 500,
      };
    }
  })
  /**
   * Creates a new member.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the created member data.
   */
  .post(
    '/members',
    async ({ db, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to create a member');

      const member = await db.member.create({
        data: {
          ...body,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        include: {
          profile: true,
          resume: true,
          chapter: true,
        },
      });

      return { data: member, status: 201 };
    },
    { body: memberSchema },
  )

  // Resources
  /**
   * Retrieves resources based on query parameters.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.query - The query parameters.
   * @returns {Object} The response object containing resources data.
   */
  .get('/resources', async ({ db, query }) => {
    try {
      const { category, type, search, chapter } = query;

      const resources = await db.resource.findMany({
        where: {
          AND: [
            category ? { category } : {},
            type ? { type } : {},
            search
              ? {
                  OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                  ],
                }
              : {},
            chapter ? { chapterId: chapter } : {},
          ],
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          chapter: {
            select: {
              id: true,
              name: true,
              greekName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return { data: resources, status: 200 };
    } catch (error) {
      return handleEden({
        data: null,
        error: error as EdenFetchError<number, string> | null,
        status: 500,
        response: {},
        headers: {},
      });
    }
  })
  /**
   * Creates a new resource.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the created resource data.
   */
  .post(
    '/resources',
    async ({ db, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to create a resource');

      const resource = await db.resource.create({
        data: {
          ...body,
          userId: session.user.id,
          createdBy: session.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          chapter: true,
        },
      });

      return { data: resource, status: 201 };
    },
    { body: resourceSchema },
  )

  // Events
  /**
   * Retrieves events based on query parameters.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.query - The query parameters.
   * @returns {Object} The response object containing events data.
   */
  .get('/events', async ({ db, query }) => {
    try {
      const { type, from, to, chapter, status } = query;

      const events = await db.event.findMany({
        where: {
          AND: [
            type ? { type } : {},
            from ? { startDate: { gte: new Date(from) } } : {},
            to ? { endDate: { lte: new Date(to) } } : {},
            chapter ? { chapterId: chapter } : {},
            status ? { status } : {},
          ],
        },
        include: {
          chapter: {
            select: {
              id: true,
              name: true,
              greekName: true,
              location: true,
            },
          },
        },
        orderBy: { startDate: 'asc' },
      });

      return { data: events, status: 200 };
    } catch (error) {
      return handleEden({
        data: null,
        error: error as EdenFetchError<number, string> | null,
        status: 500,
        response: {},
        headers: {},
      });
    }
  })
  /**
   * Creates a new event.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the created event data.
   */
  .post(
    '/events',
    async ({ db, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to create an event');

      const event = await db.event.create({
        data: {
          ...body,
          startDate: new Date(body.startDate),
          endDate: new Date(body.endDate),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        include: {
          chapter: true,
        },
      });

      return { data: event, status: 201 };
    },
    { body: eventSchema },
  )

  // Chapters
  /**
   * Retrieves chapters based on query parameters.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.query - The query parameters.
   * @returns {Object} The response object containing chapters data.
   */
  .get('/chapters', async ({ db, query }) => {
    try {
      const { status, search } = query;

      const chapters = await db.chapter.findMany({
        where: {
          AND: [
            status ? { status } : {},
            search
              ? {
                  OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { greekName: { contains: search, mode: 'insensitive' } },
                    { university: { contains: search, mode: 'insensitive' } },
                  ],
                }
              : {},
          ],
        },
        include: {
          members: {
            include: {
              profile: {
                include: {
                  user: {
                    select: {
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
          events: {
            where: {
              endDate: {
                gte: new Date(),
              },
            },
            orderBy: {
              startDate: 'asc',
            },
          },
          resources: {
            select: {
              id: true,
              title: true,
              type: true,
              category: true,
            },
          },
        },
      });

      return { data: chapters, status: 200 };
    } catch (error) {
      return handleEden({
        data: null,
        error: error as EdenFetchError<number, string> | null,
        status: 500,
        response: {},
        headers: {},
      });
    }
  })
  /**
   * Creates a new chapter.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the created chapter data.
   */
  .post(
    '/chapters',
    async ({ db, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to create a chapter');

      const chapter = await db.chapter.create({
        data: {
          ...body,
          foundingDate: new Date(body.foundingDate),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        include: {
          members: true,
        },
      });

      return { data: chapter, status: 201 };
    },
    { body: chapterSchema },
  )

  /**
   * Retrieves a member by ID.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.params - The request parameters.
   * @returns {Object} The response object containing the member data.
   */
  .get('/members/:id', async ({ db, params }) => {
    try {
      const member = await db.member.findUnique({
        where: { id: params.id },
        include: {
          profile: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true,
                },
              },
              address: true,
            },
          },
          resume: true,
          chapter: true,
          candidates: {
            include: {
              company: true,
            },
          },
        },
      });

      if (!member) return { error: 'Member not found', status: 404 };
      return { data: member, status: 200 };
    } catch (error) {
      return handleEden({
        data: null,
        error: error as EdenFetchError<number, string> | null,
        status: 500,
        response: {},
        headers: {},
      });
    }
  })
  /**
   * Updates a member by ID.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.params - The request parameters.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the updated member data.
   */
  .patch(
    '/members/:id',
    async ({ db, params, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to update a member');

      try {
        const member = await db.member.update({
          where: { id: params.id },
          data: {
            ...body,
            updatedAt: new Date(),
          },
          include: {
            profile: true,
            resume: true,
            chapter: true,
          },
        });

        return { data: member, status: 200 };
      } catch (error) {
        return handleEden({
          data: null,
          error: error as EdenFetchError<number, string> | null,
          status: 500,
          response: {},
          headers: {},
        });
      }
    },
    { body: memberUpdateSchema },
  )

  /**
   * Updates an event by ID.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.params - The request parameters.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the updated event data.
   */
  .patch(
    '/events/:id',
    async ({ db, params, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to update an event');

      try {
        const event = await db.event.update({
          where: { id: params.id },
          data: {
            ...body,
            ...(body.startDate && { startDate: new Date(body.startDate) }),
            ...(body.endDate && { endDate: new Date(body.endDate) }),
            updatedAt: new Date(),
          },
          include: {
            chapter: true,
          },
        });

        return { data: event, status: 200 };
      } catch (error) {
        return handleEden({
          data: null,
          error: error as EdenFetchError<number, string> | null,
          status: 500,
          response: {},
          headers: {},
        });
      }
    },
    { body: eventUpdateSchema },
  )

  /**
   * Updates a resource by ID.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.params - The request parameters.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the updated resource data.
   */
  .patch(
    '/resources/:id',
    async ({ db, params, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to update a resource');

      try {
        const resource = await db.resource.update({
          where: { id: params.id },
          data: {
            ...body,
            updatedAt: new Date(),
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
            chapter: true,
          },
        });

        return { data: resource, status: 200 };
      } catch (error) {
        return handleEden({
          data: null,
          error: error as EdenFetchError<number, string> | null,
          status: 500,
          response: {},
          headers: {},
        });
      }
    },
    { body: resourceUpdateSchema },
  )

  /**
   * Updates a chapter by ID.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.params - The request parameters.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the updated chapter data.
   */
  .patch(
    '/chapters/:id',
    async ({ db, params, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to update a chapter');

      try {
        const chapter = await db.chapter.update({
          where: { id: params.id },
          data: {
            ...body,
            updatedAt: new Date(),
          },
          include: {
            members: true,
            events: true,
            resources: true,
          },
        });

        return { data: chapter, status: 200 };
      } catch (error) {
        return handleEden({
          data: null,
          error: error as EdenFetchError<number, string> | null,
          status: 500,
          response: {},
          headers: {},
        });
      }
    },
    { body: chapterUpdateSchema },
  )

  /**
   * Creates an RSVP for an event.
   * @param {Object} context - The request context.
   * @param {Object} context.db - The database instance.
   * @param {Object} context.params - The request parameters.
   * @param {Object} context.body - The request body.
   * @param {Object} context.session - The session object.
   * @param {Function} context.error - The error function.
   * @returns {Object} The response object containing the created RSVP data.
   */
  .post(
    '/events/:id/rsvp',
    async ({ db, params, body, session, error }) => {
      if (!session) return error('Unauthorized', 'You must be logged in to RSVP');

      try {
        const rsvp = await db.rSVP.create({
          data: {
            eventId: params.id,
            userId: session.user.id,
            status: body.status,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });

        return { data: rsvp, status: 201 };
      } catch (error) {
        return handleEden({
          data: null,
          error: error as EdenFetchError<number, string> | null,
          status: 500,
          response: {},
          headers: {},
        });
      }
    },
    { body: rsvpSchema },
  );

export default api;
