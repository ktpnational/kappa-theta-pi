import { catchError } from '@/utils';
import type { Chapter, Event, Member, Profile, Resource, User } from '@prisma/client';
import { GraphQLDateTime } from 'graphql-iso-date';
import type { ChapterQueryArgs, CreateEventArgs, Resolver, UpdateEventArgs } from './typet';

export const resolvers: {
  DateTime: typeof GraphQLDateTime;
  Query: { [key: string]: Resolver<any> };
  Mutation: { [key: string]: Resolver<any> };
  User: { [key: string]: Resolver<any> };
  Chapter: { [key: string]: Resolver<any> };
  Event: { [key: string]: Resolver<any> };
} = {
  DateTime: GraphQLDateTime,

  Query: {
    users: (): Resolver<User[]> => async (_parent, _args, ctx) => {
      const [error, users] = await catchError(ctx.db.user.findMany());

      if (error) throw error;

      return users;
    },

    user:
      (): Resolver<User | null, unknown, { id: string }> =>
      async (_parent, { id }, ctx) => {
        const [error, user] = await catchError(
          ctx.db.user.findUnique({
            where: { id },
          }),
        );

        if (error) throw error;

        return user;
      },

    chapters:
      (): Resolver<Chapter[], unknown, ChapterQueryArgs> =>
      async (_parent, { status, search }, ctx) => {
        const [error, chapters] = await catchError(
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

        return chapters;
      },

    chapter:
      (): Resolver<Chapter | null, unknown, { id: string }> =>
      async (_parent, { id }, ctx) => {
        const [error, chapter] = await catchError(
          ctx.db.chapter.findUnique({
            where: { id },
          }),
        );

        if (error) throw error;

        return chapter;
      },

    events: (): Resolver<Event[]> => async (_parent, _args, ctx) => {
      const [error, events] = await catchError(ctx.db.event.findMany());

      if (error) throw error;

      return events;
    },

    event:
      (): Resolver<Event | null, unknown, { id: string }> =>
      async (_parent, { id }, ctx) => {
        const [error, event] = await catchError(
          ctx.db.event.findUnique({
            where: { id },
          }),
        );

        if (error) throw error;

        return event;
      },
  },

  Mutation: {
    createEvent:
      (): Resolver<Event, unknown, CreateEventArgs> =>
      async (_parent, { chapterId, ...eventData }, ctx) => {
        const [error, event] = await catchError(
          ctx.db.event.create({
            data: {
              ...eventData,
              chapterId,
            },
          }),
        );

        if (error) throw error;

        return event;
      },

    updateEvent:
      (): Resolver<Event, unknown, UpdateEventArgs> =>
      async (_parent, { id, ...args }, ctx) => {
        const [error, event] = await catchError(
          ctx.db.event.update({
            where: { id },
            data: args,
          }),
        );

        if (error) throw error;

        return event;
      },
  },

  User: {
    profile: (): Resolver<Profile | null, User> => async (parent, _args, ctx) => {
      const [error, profile] = await catchError(
        ctx.db.profile.findUnique({
          where: { userId: parent.id },
        }),
      );

      if (error) throw error;

      return profile;
    },
  },

  Chapter: {
    members: (): Resolver<Member[], Chapter> => async (parent, _args, ctx) => {
      const [error, members] = await catchError(
        ctx.db.member.findMany({
          where: { chapterId: parent.id },
        }),
      );

      if (error) throw error;

      return members;
    },

    events: (): Resolver<Event[], Chapter> => async (parent, _args, ctx) => {
      const [error, events] = await catchError(
        ctx.db.event.findMany({
          where: { chapterId: parent.id },
        }),
      );

      if (error) throw error;

      return events;
    },

    resources: (): Resolver<Resource[], Chapter> => async (parent, _args, ctx) => {
      const [error, resources] = await catchError(
        ctx.db.resource.findMany({
          where: { chapterId: parent.id },
        }),
      );

      if (error) throw error;

      return resources;
    },
  },

  Event: {
    chapter: (): Resolver<Chapter | null, Event> => async (parent, _args, ctx) => {
      const [error, chapter] = await catchError(
        ctx.db.chapter.findUnique({
          where: { id: parent.chapterId ?? undefined },
        }),
      );

      if (error) throw error;

      return chapter;
    },
  },
};
