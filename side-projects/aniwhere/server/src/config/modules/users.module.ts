import { GraphqlConfigModule } from './../../interface/graphql/graphqlConfig.module';
import { Module } from '@nestjs/common';
import { UsersService } from '../../application/service/users.service';
import { UsersController } from 'src/interface/rest-api/controller/users.controller';

@Module({
  imports: [GraphqlConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
