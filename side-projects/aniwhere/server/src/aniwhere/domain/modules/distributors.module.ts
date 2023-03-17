import { Module } from '@nestjs/common';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';
import DistributorsService from 'aniwhere/application/service/distributors.service';
import DistributorsController from 'aniwhere/interface/rest-api/controller/distributors.controller';

@Module({
  imports: [...MongodbModels],
  controllers: [DistributorsController],
  providers: [DistributorsService],
})
export class DistributorsModule {}
