---
to: src/<%= name %>/<%= h.inflection.singularize(name) %>.module.ts
---
<%
  model = h.inflection.singularize(name)
  Models = h.changeCase.pascal(name)
  Model = h.inflection.singularize(Models)
%>
import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { <%= Model %>Resolver } from './<%= model %>.resolver';
import { <%= Model %>Service } from './<%= model %>.service';

@Module({
  imports: [PrismaModule],
  providers: [<%= Model %>Service, <%= Model %>Resolver],
})
export class <%= Model %>Module {}
