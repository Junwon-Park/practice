import { Module } from '@nestjs/common';
import EnvConfigModule from 'config/env.config.module';
import MongodbModule from 'infrastructure/mongodb/mongodb.module';
import { DistributorsModule } from 'domain/modules/distributors.module';
import { FilmsModule } from 'domain/modules/films.module';
import { PaymentsModule } from 'domain/modules/payments.module';
import { UsersModule } from 'domain/modules/users.module';

@Module({
  imports: [
    EnvConfigModule,
    MongodbModule,
    UsersModule,
    FilmsModule,
    DistributorsModule,
    PaymentsModule,
  ],
})
export class AniwhereModule {}
