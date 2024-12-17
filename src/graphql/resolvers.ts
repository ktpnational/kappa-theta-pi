import type { Chapter, Event, Member, Profile, Resource, User } from '@prisma/client';
import { GraphQLDateTime } from 'graphql-iso-date';
import type { ChapterQueryArgs, CreateEventArgs, Resolver, UpdateEventArgs } from './typet';

export const catchError = async <T>(promise: Promise<T>): Promise<[Error | null, T | null]> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as Error, null];
  }
};

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
          ctx.db.user.findUnique({
            where: { id },
          }),
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
          ctx.db.chapter.findUnique({
            where: { id },
          }),
        );

        if (error) throw error;

        return chapter;
      },

    events:
      (): Resolver<Event[]> =>
      async (_parent, _args, ctx): Promise<Event[]> => {
        const [error, events] = await catchError<Event[]>(ctx.db.event.findMany());

        if (error) throw error;

        if (!events) throw new Error('Events not found');

        return events;
      },

    event:
      (): Resolver<Event | null, unknown, { id: string }> =>
      async (_parent, { id }, ctx) => {
        const [error, event] = await catchError<Event | null>(
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
      async (_parent, { chapterId, ...eventData }, ctx): Promise<Event> => {
        const [error, event] = await catchError<Event | null>(
          ctx.db.event.create({
            data: {
              ...eventData,
              chapterId,
            },
          }),
        );

        if (error) throw error;
        if (!event) throw new Error('Event not created');
        return event;
      },

    updateEvent:
      (): Resolver<Event, unknown, UpdateEventArgs> =>
      async (_parent, { id, ...args }, ctx): Promise<Event> => {
        const [error, event] = await catchError<Event | null>(
          ctx.db.event.update({
            where: { id },
            data: args,
          }),
        );

        if (error) throw error;

        if (!event) throw new Error('Event not updated');

        return event;
      },
  },

  User: {
    profile: (): Resolver<Profile | null, User> => async (parent, _args, ctx) => {
      const [error, profile] = await catchError<Profile | null>(
        ctx.db.profile.findUnique({
          where: { userId: parent.id },
        }),
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

    events:
      (): Resolver<Event[], Chapter> =>
      async (parent, _args, ctx): Promise<Event[]> => {
        const [error, events] = await catchError<Event[]>(
          ctx.db.event.findMany({
            where: { chapterId: parent.id },
          }),
        );

        if (error) throw error;

        if (!events) throw new Error('Events not found');

        return events;
      },

    resources:
      (): Resolver<Resource[], Chapter> =>
      async (parent, _args, ctx): Promise<Resource[]> => {
        const [error, resources] = await catchError<Resource[]>(
          ctx.db.resource.findMany({
            where: { chapterId: parent.id },
          }),
        );

        if (error) throw error;

        if (!resources) throw new Error('Resources not found');

        return resources;
      },
  },

  Event: {
    chapter:
      (): Resolver<Chapter | null, Event> =>
      async (parent, _args, ctx): Promise<Chapter | null> => {
        const [error, chapter] = await catchError<Chapter | null>(
          ctx.db.chapter.findUnique({
            where: { id: parent.chapterId ?? undefined },
          }),
        );

        if (error) throw error;

        return chapter;
      },
  },
};
