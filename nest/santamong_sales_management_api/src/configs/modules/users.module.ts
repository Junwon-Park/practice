import { UsersRepository } from './../../infra/mongo/repositories/users.repository';
import { UsersService } from './../../application/services/users/users.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/application/services/prisma/prisma.service';

@Module({
  providers: [UsersService, UsersRepository, PrismaService],
})
export class UsersModule {}
