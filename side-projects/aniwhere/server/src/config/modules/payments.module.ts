import { PaymentsResolver } from '../../interface/resolver/payments.resolver';
import { Module } from '@nestjs/common';
import { PaymentsController } from '../../interface/controller/payments.controller';
import { PaymentsService } from '../../application/service/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsResolver],
})
export class PaymentsModule {}
