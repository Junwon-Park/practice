import { AuthToken } from './../../common/util/authToken.util';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthToken],
})
export class UsersModule {}
