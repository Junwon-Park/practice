import { DistributorsResolver } from '../../interface/resolver/distributors.resolver';
import { Module } from '@nestjs/common';
import { DistributorsController } from '../../interface/controller/distributors.controller';
import { DistributorsService } from '../../application/service/distributors.service';

@Module({
  controllers: [DistributorsController],
  providers: [DistributorsService, DistributorsResolver],
})
export class DistributorsModule {}
