---
to: src/<%= name %>/<%= h.inflection.singularize(name) %>.model.ts
---
<%
  model = h.inflection.singularize(name)
  Model = h.changeCase.pascal(h.inflection.singularize(name))
%>
import { 
  <%= Model %> as Generated<%= Model %>, 
  <%= Model %>CreateInput as Generated<%= Model %>CreateInput,
} from '@generated/type-graphql';
import { InputType, OmitType, PartialType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class <%= Model %>Model extends Generated<%= Model %> {}

@InputType()
export class <%= Model %>CreateInput extends OmitType(Generated<%= Model %>CreateInput, [] as const) {}

@InputType()
export class <%= Model %>UpdateInput extends PartialType(<%= Model %>CreateInput) {}
