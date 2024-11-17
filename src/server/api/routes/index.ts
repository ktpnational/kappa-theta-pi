import { handleEden } from '@/utils';
import type { EdenFetchError } from 'custom';
import { t } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';
import { createElysia } from '../elysias';

/**
 * Schema for creating a new member
 * @typedef {Object} MemberSchema  
 * @property {string} profileId - The ID of the member's profile
 * @property {string} resumeId - The ID of the member's resume
 * @property {string} chapterId - The ID of the chapter the member belongs to
 */
const memberSchema = t.Object({
  profileId: t.String(),
  resumeId: t.String(), 
  chapterId: t.String(),
});

/**
 * Schema for creating a new event
 * @typedef {Object} EventSchema
 * @property {string} name - The name of the event
 * @property {string} [description] - Optional description of the event
 * @property {string} startDate - Start date/time in ISO format
 * @property {string} endDate - End date/time in ISO format 
 * @property {string} location - Location where event takes place
 * @property {string} type - Type of event
 * @property {string} status - Current status of event
 * @property {string} [chapterId] - Optional ID of chapter hosting event
 */
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

/**
 * Schema for creating a new resource
 * @typedef {Object} ResourceSchema
 * @property {string} title - Title of the resource
 * @property {string} type - Type of resource (e.g. article, video)
 * @property {string} url - URL where resource can be accessed
 * @property {string} [description] - Optional description
 * @property {string} category - Category the resource belongs to
 * @property {string[]} tags - Array of tag strings
 * @property {string} [chapterId] - Optional ID of chapter owning resource
 */
const resourceSchema = t.Object({
  title: t.String(),
  type: t.String(),
  url: t.String(), 
  description: t.Optional(t.String()),
  category: t.String(),
  tags: t.Array(t.String()),
  chapterId: t.Optional(t.String()),
});

/**
 * Schema for creating a new chapter
 * @typedef {Object} ChapterSchema
 * @property {string} name - Full name of the chapter
 * @property {string} greekName - Greek letter name of chapter
 * @property {string} foundingDate - Founding date in ISO format
 * @property {string} university - University where chapter is located
 * @property {string} location - Physical location of chapter
 * @property {string} status - Current status of chapter
 * @property {number} latitude - Latitude coordinate
 * @property {number} longitude - Longitude coordinate
 */
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

/**
 * Schema for updating an existing member
 * @typedef {Object} MemberUpdateSchema
 * @property {string} [resumeId] - New resume ID
 * @property {string} [chapterId] - New chapter ID
 */
const memberUpdateSchema = t.Object({
  resumeId: t.Optional(t.String()),
  chapterId: t.Optional(t.String()),
});

/**
 * Schema for updating an existing event
 * @typedef {Object} EventUpdateSchema 
 * @property {string} [name] - New event name
 * @property {string} [description] - New description
 * @property {string} [startDate] - New start date in ISO format
 * @property {string} [endDate] - New end date in ISO format
 * @property {string} [location] - New location
 * @property {string} [type] - New event type
 * @property {string} [status] - New status
 */
const eventUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
  startDate: t.Optional(t.String()),
  endDate: t.Optional(t.String()),
  location: t.Optional(t.String()),
  type: t.Optional(t.String()),
  status: t.Optional(t.String()),
});

/**
 * Schema for updating an existing resource
 * @typedef {Object} ResourceUpdateSchema
 * @property {string} [title] - New resource title
 * @property {string} [type] - New resource type
 * @property {string} [url] - New URL
 * @property {string} [description] - New description
 * @property {string} [category] - New category
 * @property {string[]} [tags] - New array of tags
 * @property {string} [chapterId] - New chapter ID
 */
const resourceUpdateSchema = t.Object({
  title: t.Optional(t.String()),
  type: t.Optional(t.String()),
  url: t.Optional(t.String()),
  description: t.Optional(t.String()),
  category: t.Optional(t.String()),
  tags: t.Optional(t.Array(t.String())),
  chapterId: t.Optional(t.String()),
});

/**
 * Schema for updating an existing chapter
 * @typedef {Object} ChapterUpdateSchema
 * @property {string} [name] - New chapter name
 * @property {string} [greekName] - New Greek letter name
 * @property {string} [university] - New university
 * @property {string} [location] - New location
 * @property {string} [status] - New status
 * @property {number} [latitude] - New latitude
 * @property {number} [longitude] - New longitude
 */
const chapterUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  greekName: t.Optional(t.String()),
  university: t.Optional(t.String()),
  location: t.Optional(t.String()),
  status: t.Optional(t.String()),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
});

/**
 * Schema for creating an RSVP response
 * @typedef {Object} RSVPSchema
 * @property {string} status - RSVP status ('yes', 'no', 'maybe')
 */
const rsvpSchema = t.Object({
  status: t.String(),
});

/**
 * API router with rate limiting and authentication
 * @type {import('elysia').Elysia}
 */
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
   * Searches for members based on query parameters
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {Object} context.query - Query parameters
   * @param {string} [context.query.search] - Search term for member name
   * @param {string} [context.query.chapter] - Filter by chapter ID 
   * @param {boolean} [context.query.active] - Filter by active status
   * @returns {Promise<Object>} Response containing members data or error
   * @throws {Error} On database errors
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
   * Creates a new member
   * @param {Object} context - Request context 
   * @param {Object} context.db - Database instance
   * @param {MemberSchema} context.body - Member data
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with created member or error
   * @throws {Error} If user not authenticated or database error occurs
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
   * Retrieves resources based on query parameters
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance  
   * @param {Object} context.query - Query parameters
   * @param {string} [context.query.category] - Filter by category
   * @param {string} [context.query.type] - Filter by resource type
   * @param {string} [context.query.search] - Search term
   * @param {string} [context.query.chapter] - Filter by chapter ID
   * @returns {Promise<Object>} Response with resources or error
   * @throws {EdenFetchError} On database errors
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
   * Creates a new resource
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {ResourceSchema} context.body - Resource data
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with created resource or error
   * @throws {Error} If user not authenticated or database error occurs
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
   * Retrieves events based on query parameters
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {Object} context.query - Query parameters
   * @param {string} [context.query.type] - Filter by event type
   * @param {string} [context.query.from] - Filter by start date
   * @param {string} [context.query.to] - Filter by end date
   * @param {string} [context.query.chapter] - Filter by chapter ID
   * @param {string} [context.query.status] - Filter by status
   * @returns {Promise<Object>} Response with events or error
   * @throws {EdenFetchError} On database errors
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
   * Creates a new event
   * @param {Object} context - Request context  
   * @param {Object} context.db - Database instance
   * @param {EventSchema} context.body - Event data 
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with created event or error
   * @throws {Error} If user not authenticated or database error occurs
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
   * Retrieves chapters based on query parameters
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {Object} context.query - Query parameters
   * @param {string} [context.query.status] - Filter by chapter status
   * @param {string} [context.query.search] - Search term
   * @returns {Promise<Object>} Response with chapters or error
   * @throws {EdenFetchError} On database errors
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
   * Creates a new chapter
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {ChapterSchema} context.body - Chapter data
   * @param {Object} context.session - User session  
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with created chapter or error
   * @throws {Error} If user not authenticated or database error occurs
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
   * Gets member by ID with full profile data
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {Object} context.params - URL parameters
   * @param {string} context.params.id - Member ID
   * @returns {Promise<Object>} Response with member or error
   * @throws {EdenFetchError} On database errors
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
   * Updates a member by ID
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {Object} context.params - URL parameters
   * @param {string} context.params.id - Member ID
   * @param {MemberUpdateSchema} context.body - Update data
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with updated member or error
   * @throws {Error} If user not authenticated
   * @throws {EdenFetchError} On database errors
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
   * Updates an event by ID
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {Object} context.params - URL parameters
   * @param {string} context.params.id - Event ID
   * @param {EventUpdateSchema} context.body - Update data
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with updated event or error
   * @throws {Error} If user not authenticated
   * @throws {EdenFetchError} On database errors
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
   * Updates a resource by ID
   * @param {Object} context - Request context  
   * @param {Object} context.db - Database instance
   * @param {Object} context.params - URL parameters
   * @param {string} context.params.id - Resource ID
   * @param {ResourceUpdateSchema} context.body - Update data
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler  
   * @returns {Promise<Object>} Response with updated resource or error
   * @throws {Error} If user not authenticated
   * @throws {EdenFetchError} On database errors
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
   * Updates a chapter by ID
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance  
   * @param {Object} context.params - URL parameters
   * @param {string} context.params.id - Chapter ID
   * @param {ChapterUpdateSchema} context.body - Update data
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with updated chapter or error
   * @throws {Error} If user not authenticated
   * @throws {EdenFetchError} On database errors
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
   * Creates an RSVP response for an event
   * @param {Object} context - Request context
   * @param {Object} context.db - Database instance
   * @param {Object} context.params - URL parameters  
   * @param {string} context.params.id - Event ID
   * @param {RSVPSchema} context.body - RSVP data
   * @param {Object} context.session - User session
   * @param {Function} context.error - Error handler
   * @returns {Promise<Object>} Response with created RSVP or error
   * @throws {Error} If user not authenticated  
   * @throws {EdenFetchError} On database errors
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
