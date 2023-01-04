import { GraphqlConfigModule } from './../../interface/graphql/graphqlConfig.module';
import { Module } from '@nestjs/common';
import { PaymentsService } from '../../application/service/payments.service';
import { PaymentsController } from 'src/interface/rest-api/controller/payments.controller';

@Module({
  imports: [GraphqlConfigModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
