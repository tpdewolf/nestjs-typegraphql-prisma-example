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
