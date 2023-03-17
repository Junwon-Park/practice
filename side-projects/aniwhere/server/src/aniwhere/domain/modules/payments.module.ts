import { Module } from '@nestjs/common';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';
import PaymentsService from 'aniwhere/application/service/payments.service';
import PaymentsController from 'aniwhere/interface/rest-api/controller/payments.controller';

@Module({
  imports: [...MongodbModels],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
