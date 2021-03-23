---
to: src/<%= name %>/<%= h.inflection.singularize(name) %>.service.ts
---
<%
  models = name
  model = h.inflection.singularize(models)
  Models = h.changeCase.pascal(models)
  Model = h.inflection.singularize(Models)
  modelsCamel = h.changeCase.camel(models)
  modelCamel = h.changeCase.camel(model)
%>
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class <%= Model %>Service {
  constructor(private prisma: PrismaService) {}
}
