import { Module } from '@nestjs/common';
import { PaymentsService } from 'application/service/payments.service';
import { PaymentsController } from 'interface/rest-api/controller/payments.controller';
import { MongodbModels } from 'infrastructure/mongodb/mongodb.module';

@Module({
  imports: [...MongodbModels],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
