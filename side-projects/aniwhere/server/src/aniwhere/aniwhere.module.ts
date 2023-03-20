import { AniwhereStrategy } from 'aniwhere/common/auth/aniwhere.strategy';
import { DefaultGraphQLModule } from 'aniwhere/interface/graphql/graphql.config.module';
import { Module } from '@nestjs/common';
import MongodbModule from 'aniwhere/infrastructure/mongodb/mongodb.module';
import { DistributorsModule } from 'aniwhere/domain/modules/distributors.module';
import { FilmsModule } from 'aniwhere/domain/modules/films.module';
import { PaymentsModule } from 'aniwhere/domain/modules/payments.module';
import { UsersModule } from 'aniwhere/domain/modules/users.module';
import GraphqlModule from 'aniwhere/interface/graphql/graphql.module';
import { DefaultAniwhereJwtAuthModule } from 'aniwhere/common/auth/aniwhere.auth.module';

@Module({
  imports: [
    MongodbModule,
    UsersModule,
    FilmsModule,
    DistributorsModule,
    PaymentsModule,
    GraphqlModule,
    DefaultGraphQLModule('/aniwhere'),
    DefaultAniwhereJwtAuthModule('30d'), // * JwtModule.register()를 import하는 모듈
  ],
  providers: [AniwhereStrategy], // JwtModule.register()를 import하는 모듈에서 Strategy를 provider에 등록해야 한다.
})
export class AniwhereModule {}
