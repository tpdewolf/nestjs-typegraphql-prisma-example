import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';

import { AuthorModule } from './authors/author.module';
import { CommentModule } from './comments/comment.module';
import { PostModule } from './posts/post.module';

const prisma = new PrismaClient();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      debug: true,
      introspection: true,
      context: ({ req }) => ({ request: req, prisma }),
    }),
    AuthorModule,
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}
