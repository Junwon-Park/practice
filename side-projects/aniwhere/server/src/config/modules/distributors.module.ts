import { GraphqlConfigModule } from './../../interface/graphql/graphqlConfig.module';
import { Module } from '@nestjs/common';
import { DistributorsService } from '../../application/service/distributors.service';
import { DistributorsController } from 'src/interface/rest-api/controller/distributors.controller';

@Module({
  imports: [GraphqlConfigModule],
  controllers: [DistributorsController],
  providers: [DistributorsService],
})
export class DistributorsModule {}
