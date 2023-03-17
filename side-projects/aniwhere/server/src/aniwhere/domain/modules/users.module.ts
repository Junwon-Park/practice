import { Module } from '@nestjs/common';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';
import UsersService from 'aniwhere/application/service/users.service';
import UsersController from 'aniwhere/interface/rest-api/controller/users.controller';
import UserRepository from 'aniwhere/infrastructure/mongodb/repository/users.repository';

@Module({
  imports: [...MongodbModels],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}
