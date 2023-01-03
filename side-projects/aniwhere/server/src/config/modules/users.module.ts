import { UsersResolver } from '../../interface/resolver/users.resolver';
import { Module } from '@nestjs/common';
import { UsersController } from '../../interface/controller/users.controller';
import { UsersService } from '../../application/service/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
