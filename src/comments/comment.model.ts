
import { 
  Comment as GeneratedComment, 
  CommentCreateInput as GeneratedCommentCreateInput,
} from '@generated/type-graphql';
import { InputType, OmitType, PartialType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel extends GeneratedComment {}

@InputType()
export class CommentCreateInput extends OmitType(GeneratedCommentCreateInput, [] as const) {}

@InputType()
export class CommentUpdateInput extends PartialType(CommentCreateInput) {}
