## Description

This project is an example of how to use the [typegraphql-prisma](https://github.com/MichalLytek/typegraphql-prisma) generator with [Nest.js](https://docs.nestjs.com).

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn dev

# production mode
$ yarn start:prod
```

## TypegraphQL Prisma

TypegraphQL Prisma is an awesome library by [Michael Lytek](https://github.com/MichalLytek). It generates the model, input and argument classes and resolvers based on your prisma schema. As described in the docs it does not support NestJS GraphQL above version 7 because the decorators differ slightly from TypegraphQL. Therefore I've patched the library with [patch-package](https://github.com/ds300/patch-package) to change the decorators the work with NestJS GraphQL 7.

- import package from `type-graphql` to `@nestjs/graphql`
- `@Ctx` decorator to `@Context`
- `@FieldResolver` decorator to `@ResolveField`
- `@Root` decorator to `@Parent`

That's all that was needed to make it work with NestJS. The patch is automatically applied after install with the `postinstall` npm script.

## Generating the code

Run the prisma cli to generate the code

```bash
$ npx prisma generate
```

This will create the prisma client, but also a `@generated` folder in `node_modules` that includes all input classes, model classes and resolvers based on your schema.

You can now import the resolvers into your module from the `@generated/type-graphql` folder.

```typescript
import {
  PostCrudResolver,
  PostRelationsResolver,
} from '@generated/type-graphql';
import { Module } from '@nestjs/common';

@Module({
  providers: [PostCrudResolver, PostRelationsResolver],
})
export class PostModule {}
```

## Customizing the resolvers

Often you would like to customize the resolvers or input and model classes. The project includes a [hygen](https://www.hygen.io/) generator to generate a resolver, module, service and model.

To generate the code run the following command

```bash
$ npx hygen module create <name>
```

### Example model

The model extends the model from `@generated/type-graphql`. To add a property to the GraphQL schema, simply add it to the model. To remove a property use the `OmitType` or `PickType` helper provided by NestJS.

```typescript
import {
  Post as GeneratedPost,
  PostCreateInput as GeneratedPostCreateInput,
} from '@generated/type-graphql';
import { InputType, OmitType, PartialType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostModel extends GeneratedPost {}

@InputType()
export class PostCreateInput extends OmitType(
  GeneratedPostCreateInput,
  [] as const,
) {}

@InputType()
export class PostUpdateInput extends PartialType(PostCreateInput) {}
```

The generator doesnt add the relations to the model automatically. To add the `comments` relation to the `Post` simply add it to the PostModel

```typescript
@ObjectType()
export class PostModel extends GeneratedPost {
  @Field(() => [CommentModel])
  comments: CommandModal[];
}
```

### Example resolver

The resolver includes all basic crud operations. The `@SelectArgs` decorator utilizes the PrismaSelect class from [Pal.js](https://paljs.com/plugins/select/). It extracts the fields from the grapqhl query. They are added to arguments of the prisma client. This also works for relations. The relations are only queried when the fields for the relation is requested in the GraphQL query.

```typescript
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
        where,
      }),
    );
  }
}
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
