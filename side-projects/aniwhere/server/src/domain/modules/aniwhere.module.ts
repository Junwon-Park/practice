import { Module } from '@nestjs/common';
import EnvConfigModule from 'src/config/env.config.module';
import MongodbModule from 'src/infrastructure/mongodb/mongodb.module';
import { DistributorsModule } from './distributors.module';
import { FilmsModule } from './films.module';
import { PaymentsModule } from './payments.module';
import { UsersModule } from './users.module';

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
