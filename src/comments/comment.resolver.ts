
import {
  FindUniqueCommentArgs,
  FindManyCommentArgs,
  CommentWhereUniqueInput,
} from '@generated/type-graphql';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import merge from 'lodash.merge';

import { SelectArgs } from '@/graphql/select-args.decorator';
import { AppContext } from '@/types/context';

import { CommentModel, CommentCreateInput, CommentUpdateInput } from './comment.model';
import { CommentService } from './comment.service';

@Resolver(() => CommentModel)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => CommentModel, { nullable: true })
  async comment(
    @Args() args: FindUniqueCommentArgs,
    @Context() ctx: AppContext,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.comment.findFirst(merge(args, select));
  }

  @Query(() => [CommentModel])
  async comments(
    @Context() ctx: AppContext,
    @Args() args: FindManyCommentArgs,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.comment.findMany(merge(args, select));
  }

  @Mutation(() => CommentModel)
  async createComment(
    @Context() ctx: AppContext,
    @Args('data') data: CommentCreateInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.comment.create(
      merge(select, {
        data,
      }),
    );
  }

  @Mutation(() => CommentModel, { nullable: true })
  async updateComment(
    @Context() ctx: AppContext,
    @SelectArgs() select,
    @Args('where') where: CommentWhereUniqueInput,
    @Args('data') data: CommentUpdateInput,
  ) {
    const { prisma } = ctx;

    return prisma.comment.update(
      merge(select, {
        where,
        data,
      }),
    );
  }

  @Mutation(() => CommentModel, { nullable: true })
  async deleteComment(
    @Context() ctx: AppContext,
    @Args('where') where: CommentWhereUniqueInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.comment.delete(
      merge(select, {
        where
      }),
    );
  }
}
