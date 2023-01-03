import { Module } from '@nestjs/common';
import { UsersModule } from './config/modules/users.module';
import { FilmsModule } from './config/modules/films.module';
import { DistributorsModule } from './config/modules/distributors.module';
import { PaymentsModule } from './config/modules/payments.module';
@Module({
  imports: [UsersModule, FilmsModule, DistributorsModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
