import {
  FindUniqueAuthorArgs,
  FindManyAuthorArgs,
  AuthorWhereUniqueInput,
} from '@generated/type-graphql';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import merge from 'lodash.merge';

import { SelectArgs } from '@/graphql/select-args.decorator';
import { AppContext } from '@/types/context';

import {
  AuthorModel,
  AuthorCreateInput,
  AuthorUpdateInput,
} from './author.model';
import { AuthorService } from './author.service';

@Resolver(() => AuthorModel)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => AuthorModel, { nullable: true })
  async author(
    @Args() args: FindUniqueAuthorArgs,
    @Context() ctx: AppContext,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.author.findFirst(merge(args, select));
  }

  @Query(() => [AuthorModel])
  async authors(
    @Context() ctx: AppContext,
    @Args() args: FindManyAuthorArgs,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.author.findMany(merge(args, select));
  }

  @Mutation(() => AuthorModel)
  async createAuthor(
    @Context() ctx: AppContext,
    @Args('data') data: AuthorCreateInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.author.create(
      merge(select, {
        data,
      }),
    );
  }

  @Mutation(() => AuthorModel, { nullable: true })
  async updateAuthor(
    @Context() ctx: AppContext,
    @SelectArgs() select,
    @Args('where') where: AuthorWhereUniqueInput,
    @Args('data') data: AuthorUpdateInput,
  ) {
    const { prisma } = ctx;

    return prisma.author.update(
      merge(select, {
        where,
        data,
      }),
    );
  }

  @Mutation(() => AuthorModel, { nullable: true })
  async deleteAuthor(
    @Context() ctx: AppContext,
    @Args('where') where: AuthorWhereUniqueInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.author.delete(
      merge(select, {
        where,
      }),
    );
  }
}
