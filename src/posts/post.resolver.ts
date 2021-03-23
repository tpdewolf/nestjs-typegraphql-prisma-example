
import {
  FindUniquePostArgs,
  FindManyPostArgs,
  PostWhereUniqueInput,
} from '@generated/type-graphql';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import merge from 'lodash.merge';

import { SelectArgs } from '@/graphql/select-args.decorator';
import { AppContext } from '@/types/context';

import { PostModel, PostCreateInput, PostUpdateInput } from './post.model';
import { PostService } from './post.service';

@Resolver(() => PostModel)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => PostModel, { nullable: true })
  async post(
    @Args() args: FindUniquePostArgs,
    @Context() ctx: AppContext,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.post.findFirst(merge(args, select));
  }

  @Query(() => [PostModel])
  async posts(
    @Context() ctx: AppContext,
    @Args() args: FindManyPostArgs,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.post.findMany(merge(args, select));
  }

  @Mutation(() => PostModel)
  async createPost(
    @Context() ctx: AppContext,
    @Args('data') data: PostCreateInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.post.create(
      merge(select, {
        data,
      }),
    );
  }

  @Mutation(() => PostModel, { nullable: true })
  async updatePost(
    @Context() ctx: AppContext,
    @SelectArgs() select,
    @Args('where') where: PostWhereUniqueInput,
    @Args('data') data: PostUpdateInput,
  ) {
    const { prisma } = ctx;

    return prisma.post.update(
      merge(select, {
        where,
        data,
      }),
    );
  }

  @Mutation(() => PostModel, { nullable: true })
  async deletePost(
    @Context() ctx: AppContext,
    @Args('where') where: PostWhereUniqueInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.post.delete(
      merge(select, {
        where
      }),
    );
  }
}
