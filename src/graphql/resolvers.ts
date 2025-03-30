import type { ChapterQueryArgs, Resolver } from '@/graphql/types';
import { logger } from '@/utils';
import type { Chapter, Member, Profile, User } from '@prisma/client';
import { GraphQLDateTime } from 'graphql-iso-date';

export const catchError = async <T>(promise: Promise<T>): Promise<[Error | null, T | null]> => {
  const log = logger.getSubLogger({ prefix: ['graphql', 'resolvers', 'catchError'] });
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    log.error('catchError', { error });
    return [error as Error, null];
  }
};

export const resolvers: {
  DateTime: typeof GraphQLDateTime;
  Query: { [key: string]: Resolver<any> };
  User: { [key: string]: Resolver<any> };
  Chapter: { [key: string]: Resolver<any> };
} = {
  DateTime: GraphQLDateTime,
  Query: {
    users:
      (): Resolver<User[]> =>
      async (_parent, _args, ctx): Promise<User[]> => {
        const [error, users] = await catchError<User[]>(ctx.db.user.findMany());

        if (error) throw error;

        if (!users) throw new Error('Users not found');

        return users;
      },

    user:
      (): Resolver<User | null, unknown, { id: string }> =>
      async (_parent, { id }, ctx) => {
        const [error, user] = await catchError<User | null>(
          ctx.db.user
            .findUnique({
              where: { id },
            })
            .withAccelerateInfo()
            .then(({ data }) => data),
        );

        if (error) throw error;

        return user;
      },

    chapters:
      (): Resolver<Chapter[], unknown, ChapterQueryArgs> =>
      async (_parent, { status, search }, ctx): Promise<Chapter[]> => {
        const [error, chapters] = await catchError<Chapter[]>(
          ctx.db.chapter.findMany({
            where: {
              AND: [
                status ? { status } : {},
                search
                  ? {
                      OR: [{ name: { contains: search } }, { greekName: { contains: search } }],
                    }
                  : {},
              ],
            },
          }),
        );

        if (error) throw error;

        if (!chapters) throw new Error('Chapters not found');

        return chapters;
      },

    chapter:
      (): Resolver<Chapter | null, unknown, { id: string }> =>
      async (_parent, { id }, ctx) => {
        const [error, chapter] = await catchError<Chapter | null>(
          ctx.db.chapter
            .findUnique({
              where: { id },
            })
            .withAccelerateInfo()
            .then(({ data }) => data),
        );

        if (error) throw error;

        return chapter;
      },
  },

  User: {
    profile: (): Resolver<Profile | null, User> => async (parent, _args, ctx) => {
      const [error, profile] = await catchError<Profile | null>(
        ctx.db.profile
          .findUnique({
            where: { userId: parent.id },
          })
          .withAccelerateInfo()
          .then(({ data }) => data),
      );

      if (error) throw error;

      return profile;
    },
  },

  Chapter: {
    members:
      (): Resolver<Member[], Chapter> =>
      async (parent, _args, ctx): Promise<Member[]> => {
        const [error, members] = await catchError<Member[]>(
          ctx.db.member.findMany({
            where: { chapterId: parent.id },
          }),
        );

        if (error) throw error;

        if (!members) throw new Error('Members not found');

        return members;
      },
  },
};
