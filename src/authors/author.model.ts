import {
  Author as GeneratedAuthor,
  AuthorCreateInput as GeneratedAuthorCreateInput,
} from '@generated/type-graphql';
import {
  InputType,
  OmitType,
  PartialType,
  ObjectType,
  Field,
} from '@nestjs/graphql';

import { PostModel } from '@/posts/post.model';

@ObjectType()
export class AuthorModel extends GeneratedAuthor {
  @Field(() => [PostModel])
  posts: PostModel[];
}

@InputType()
export class AuthorCreateInput extends OmitType(
  GeneratedAuthorCreateInput,
  [] as const,
) {}

@InputType()
export class AuthorUpdateInput extends PartialType(AuthorCreateInput) {}
