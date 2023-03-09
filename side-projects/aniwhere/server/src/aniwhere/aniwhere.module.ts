import { DefaultGraphQLModule } from 'aniwhere/interface/graphql/graphql.config.module';
import { Module } from '@nestjs/common';
import MongodbModule from 'aniwhere/infrastructure/mongodb/mongodb.module';
import { DistributorsModule } from 'aniwhere/domain/modules/distributors.module';
import { FilmsModule } from 'aniwhere/domain/modules/films.module';
import { PaymentsModule } from 'aniwhere/domain/modules/payments.module';
import { UsersModule } from 'aniwhere/domain/modules/users.module';
import GraphqlModule from 'aniwhere/interface/graphql/graphql.module';

@Module({
  imports: [
    MongodbModule,
    UsersModule,
    FilmsModule,
    DistributorsModule,
    PaymentsModule,
    GraphqlModule,
    DefaultGraphQLModule('/aniwhere'),
  ],
})
export class AniwhereModule {}
