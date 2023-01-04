import { GraphqlConfigModule } from './../../interface/graphql/graphqlConfig.module';
import { Module } from '@nestjs/common';
import { DistributorsService } from '../../application/service/distributors.service';
import { DistributorsController } from 'src/interface/rest-api/controller/distributors.controller';
import { MongodbModels } from 'src/infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels, GraphqlConfigModule],
  controllers: [DistributorsController],
  providers: [DistributorsService],
})
export class DistributorsModule {}
