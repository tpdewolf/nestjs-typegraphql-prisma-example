---
to: src/<%= name %>/<%= h.inflection.singularize(name) %>.resolver.ts
---
<%
  models = name
  model = h.inflection.singularize(models)
  Models = h.changeCase.pascal(models)
  Model = h.inflection.singularize(Models)
  modelsCamel = h.changeCase.camel(models)
  modelCamel = h.changeCase.camel(model)
%>
import {
  FindUnique<%= Model %>Args,
  FindMany<%= Model %>Args,
  <%= Model %>WhereUniqueInput,
} from '@generated/type-graphql';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import merge from 'lodash.merge';

import { SelectArgs } from '@/graphql/select-args.decorator';
import { AppContext } from '@/types/context';

import { <%= Model %>Model, <%= Model %>CreateInput, <%= Model %>UpdateInput } from './<%= model %>.model';
import { <%= Model %>Service } from './<%= model %>.service';

@Resolver(() => <%= Model %>Model)
export class <%= Model %>Resolver {
  constructor(private readonly <%= modelCamel %>Service: <%= Model %>Service) {}

  @Query(() => <%= Model %>Model, { nullable: true })
  async <%= modelCamel %>(
    @Args() args: FindUnique<%= Model %>Args,
    @Context() ctx: AppContext,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.<%= modelCamel %>.findFirst(merge(args, select));
  }

  @Query(() => [<%= Model %>Model])
  async <%= modelsCamel %>(
    @Context() ctx: AppContext,
    @Args() args: FindMany<%= Model %>Args,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.<%= modelCamel %>.findMany(merge(args, select));
  }

  @Mutation(() => <%= Model %>Model)
  async create<%= Model %>(
    @Context() ctx: AppContext,
    @Args('data') data: <%= Model %>CreateInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.<%= modelCamel %>.create(
      merge(select, {
        data,
      }),
    );
  }

  @Mutation(() => <%= Model %>Model, { nullable: true })
  async update<%= Model %>(
    @Context() ctx: AppContext,
    @SelectArgs() select,
    @Args('where') where: <%= Model %>WhereUniqueInput,
    @Args('data') data: <%= Model %>UpdateInput,
  ) {
    const { prisma } = ctx;

    return prisma.<%= modelCamel %>.update(
      merge(select, {
        where,
        data,
      }),
    );
  }

  @Mutation(() => <%= Model %>Model, { nullable: true })
  async delete<%= Model %>(
    @Context() ctx: AppContext,
    @Args('where') where: <%= Model %>WhereUniqueInput,
    @SelectArgs() select,
  ) {
    const { prisma } = ctx;

    return prisma.<%= modelCamel %>.delete(
      merge(select, {
        where
      }),
    );
  }
}
