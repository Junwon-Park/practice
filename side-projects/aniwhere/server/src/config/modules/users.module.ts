import { GraphqlConfigModule } from './../../interface/graphql/graphqlConfig.module';
import { Module } from '@nestjs/common';
import { UsersService } from '../../application/service/users.service';
import { UsersController } from 'src/interface/rest-api/controller/users.controller';
import { MongodbModels } from 'src/infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels, GraphqlConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
