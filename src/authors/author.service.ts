
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}
}
