import { Module } from '@nestjs/common';
import { DistributorsService } from 'aniwhere/application/service/distributors.service';
import { DistributorsController } from 'aniwhere/interface/rest-api/controller/distributors.controller';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels],
  controllers: [DistributorsController],
  providers: [DistributorsService],
})
export class DistributorsModule {}
