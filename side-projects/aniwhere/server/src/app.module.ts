import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { UsersModule } from './config/modules/users.module';
import { FilmsModule } from './config/modules/films.module';
import { DistributorsModule } from './config/modules/distributors.module';
import { PaymentsModule } from './config/modules/payments.module';
import EnvConfigModule from 'env/env.config.module';
import MongodbModule from './infrastructure/mongodb/mongodb.module';
import { DefaultGraphQLModule } from './interface/graphql/graphql.config.module';

@Module({
  imports: [
    EnvConfigModule,
    MongodbModule,
    UsersModule,
    FilmsModule,
    DistributorsModule,
    PaymentsModule,
    DefaultGraphQLModule('/aniwhere'),
  ],
})
export class AppModule {}
