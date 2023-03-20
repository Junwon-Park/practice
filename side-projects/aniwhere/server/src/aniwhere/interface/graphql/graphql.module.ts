import { AuthResolver } from 'aniwhere/interface/graphql/resolver/auth.resolver';
import { PaymentsResolver } from 'aniwhere/interface/graphql/resolver/payments.resolver';
import { UsersResolver } from 'aniwhere/interface/graphql/resolver/users.resolver';
import { Module } from '@nestjs/common';
import { DistributorsResolver } from 'aniwhere/interface/graphql/resolver/distributors.resolver';
import { FilmsResolver } from 'aniwhere/interface/graphql/resolver/films.resolver';
import { AuthModule } from 'aniwhere/domain/modules/auth.module';

@Module({
  imports: [AuthModule],
  // ! providers에 Resolver를 등록 해야 Resolver를 인식할 수 있다.
  providers: [
    DistributorsResolver,
    FilmsResolver,
    UsersResolver,
    PaymentsResolver,
    AuthResolver,
  ],
})
export default class GraphqlModule {} // Resolver를 등록한 모듈을 GraphqlConfigModule의 import 옵션에 등록하면 GraphQL이 위 Resolver들을 인식할 수 있다.
