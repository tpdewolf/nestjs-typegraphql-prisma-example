import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';

import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthorService, AuthorResolver],
})
export class AuthorModule {}
