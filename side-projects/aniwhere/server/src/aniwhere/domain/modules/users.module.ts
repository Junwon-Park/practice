import { Module } from '@nestjs/common';
import { UsersService } from 'aniwhere/application/service/users.service';
import { UsersController } from 'aniwhere/interface/rest-api/controller/users.controller';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
