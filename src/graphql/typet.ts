export type Resolver<TResult, TParent = unknown, TArgs = unknown> = (
  parent: TParent,
  args: TArgs,
  ctx: import('@/app/api/v1/[[...routes]]/route').App['derive'],
  info: import('graphql').GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export interface ChapterQueryArgs {
  status?: string;
  search?: string;
}

export interface CreateEventArgs {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  type: string;
  status: string;
  chapterId: string;
}

export interface UpdateEventArgs {
  id: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  type?: string;
  status?: string;
}
