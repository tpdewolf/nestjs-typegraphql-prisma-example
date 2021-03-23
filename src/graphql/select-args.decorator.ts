import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaSelect } from '@paljs/plugins';

export const SelectArgs = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const info = context.getArgByIndex(3);
    const select = new PrismaSelect(info).value;

    return select;
  },
);
