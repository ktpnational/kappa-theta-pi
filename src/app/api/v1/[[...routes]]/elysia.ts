// @ts-nocheck

// import { db } from '@/lib/prisma';
import { auth } from '@/server';
import { Stringify, handleEden } from '@/utils';
import type { Session } from 'better-auth';
import type { EdenFetchError } from 'custom';
import Elysia, { t } from 'elysia';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';

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

export const createContext = new Elysia()
  .derive(
    async (
      _,
    ): Promise<{
      db: any; // typeof db;
      session: Session;
    }> => {
      // const session = (await auth.api.getSession({ headers: await headers() }))?.session;

      // if (!session) {
      //   unauthorized();
      // }

      // Return mock session for development
      return { db: {}, session: {} as Session };
    },
  )
  .as('plugin');

const timingMiddleware = new Elysia()
  .state({ start: 0 })
  .onBeforeHandle(({ store }) => (store.start = Date.now()))
  .onAfterHandle(({ path, store: { start } }) =>
    console.log(`[Elysia] ${path} took ${Date.now() - start}ms to execute`),
  )
  .as('plugin');

export const dashboardRoute = new Elysia()
  .use(createContext)
  .use(timingMiddleware)
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
  // @ts-ignore
  .get('/members/search', async ({ db, query }) => {
    try {
      // const { search, chapter, active } = query;

      // const members = await db.member.findMany({
      //   where: {
      //     AND: [
      //       search
      //         ? {
      //             profile: {
      //               user: { name: { contains: search, mode: 'insensitive' } },
      //             },
      //           }
      //         : {},
      //       chapter ? { chapterId: chapter } : {},
      //       active !== undefined
      //         ? {
      //             profile: { active: Boolean(active) },
      //           }
      //         : {},
      //     ],
      //   },
      //   include: {
      //     profile: {
      //       include: {
      //         user: {
      //           select: {
      //             id: true,
      //             name: true,
      //             email: true,
      //             image: true,
      //           },
      //         },
      //         address: true,
      //       },
      //     },
      //     resume: true,
      //     chapter: true,
      //   },
      // });

      return { data: [], error: null, status: 200 };
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
    // @ts-ignore
    async ({ db, body, session, error }) => {
      // if (!session) return error('Unauthorized', 'You must be logged in to create a member');

      // const member = await db.member.create({
      //   data: {
      //     ...body,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   include: {
      //     profile: true,
      //     resume: true,
      //     chapter: true,
      //   },
      // });

      return { data: {}, status: 201 };
    },
    { body: memberSchema },
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
  // @ts-ignore
  .get('/chapters', async ({ db, query }) => {
    try {
      // const { status, search } = query;

      // const chapters = await db.chapter.findMany({
      //   where: {
      //     AND: [
      //       status ? { status } : {},
      //       search
      //         ? {
      //             OR: [
      //               { name: { contains: search, mode: 'insensitive' } },
      //               { greekName: { contains: search, mode: 'insensitive' } },
      //               { university: { contains: search, mode: 'insensitive' } },
      //             ],
      //           }
      //         : {},
      //     ],
      //   },
      //   include: {
      //     members: {
      //       include: {
      //         profile: {
      //           include: {
      //             user: {
      //               select: {
      //                 name: true,
      //                 email: true,
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // });

      return { data: [], status: 200 };
    } catch (error) {
      return handleEden({
        data: null,
        error: error as EdenFetchError<number, string> | null,
        status: 500,
        response: {},
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
    // @ts-ignore
    async ({ db, body, session, error }) => {
      // if (!session) return error('Unauthorized', 'You must be logged in to create a chapter');

      // const chapter = await db.chapter.create({
      //   data: {
      //     ...body,
      //     foundingDate: new Date(body.foundingDate),
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   include: {
      //     members: true,
      //   },
      // });

      return { data: {}, status: 201 };
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
  // @ts-ignore
  .get('/members/:id', async ({ db, params }) => {
    try {
      // const member = await db.member.findUnique({
      //   where: { id: params.id },
      //   include: {
      //     profile: {
      //       include: {
      //         user: {
      //           select: {
      //             id: true,
      //             name: true,
      //             email: true,
      //             image: true,
      //           },
      //         },
      //         address: true,
      //       },
      //     },
      //     resume: true,
      //     chapter: true,
      //     candidates: {
      //       include: {
      //         company: true,
      //       },
      //     },
      //   },
      // });

      // if (!member) return { error: 'Member not found', status: 404 };
      return { data: {}, status: 200 };
    } catch (error) {
      return handleEden({
        data: null,
        error: error as EdenFetchError<number, string> | null,
        status: 500,
        response: {},
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
    // @ts-ignore
    async ({ db, params, body, session, error }) => {
      // if (!session) return error('Unauthorized', 'You must be logged in to update a member');

      try {
        // const member = await db.member.update({
        //   where: { id: params.id },
        //   data: {
        //     ...body,
        //     updatedAt: new Date(),
        //   },
        //   include: {
        //     profile: true,
        //     resume: true,
        //     chapter: true,
        //   },
        // });

        return { data: {}, status: 200 };
      } catch (error) {
        return handleEden({
          data: null,
          error: error as EdenFetchError<number, string> | null,
          status: 500,
          response: {},
        });
      }
    },
    { body: memberUpdateSchema },
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
    // @ts-ignore
    async ({ db, params, body, session, error }) => {
      // if (!session) return error('Unauthorized', 'You must be logged in to update a chapter');

      try {
        // const chapter = await db.chapter.update({
        //   where: { id: params.id },
        //   data: {
        //     ...body,
        //     updatedAt: new Date(),
        //   },
        //   include: {
        //     members: true,
        //   },
        // });

        return { data: {}, status: 200 };
      } catch (error) {
        return handleEden({
          data: null,
          error: error as EdenFetchError<number, string> | null,
          status: 500,
          response: {},
        });
      }
    },
    { body: chapterUpdateSchema },
  )
  // @ts-ignore
  .get('/company/profile', async ({ db, session }) => {
    try {
      // const { userId } = session;
      // const profile = await db.profile.findUnique({
      //   where: { userId },
      //   include: {
      //     company: true,
      //   },
      // });

      return { data: {}, error: null, status: 200 };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : 'Internal server error',
        },
        status: 500,
      };
    }
  })
  // @ts-ignore
  .get('/member/profile', async ({ db, session }) => {
    try {
      // const { userId } = session;
      // const profile = await db.profile.findUnique({
      //   where: { userId },
      //   include: {
      //     member: {
      //       include: {
      //         chapter: true,
      //         resume: true,
      //       },
      //     },
      //   },
      // });
      return { data: {}, error: null, status: 200 };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : 'Internal server error',
        },
        status: 500,
      };
    }
  });

export const utilityRoute = new Elysia()
  .use(createContext)
  .use(timingMiddleware)
  // @ts-ignore
  .get('/get-role', async ({ db, session }) => {
    try {
      // const { userId } = session;
      // const role = await db.user.findUnique({
      //   where: {
      //     id: userId,
      //   },
      //   select: {
      //     role: true,
      //   },
      // });

      // // TODO: 🚩 This is a temporary fix to get the role
      // if (!role) return { error: 'User not found', status: 404 };

      return { data: { role: 'USER' }, status: 200 };
    } catch (err) {
      return handleEden({
        data: null,
        error: err as EdenFetchError<number, string> | null,
        status: 500,
        response: {},
      });
    }
  })
  .get('/health', () => {
    return Stringify({ message: 'ok', status: 200 });
  });
