import { PaymentsResolver } from 'interface/graphql/resolver/payments.resolver';
import { UsersResolver } from 'interface/graphql/resolver/users.resolver';
import { Module } from '@nestjs/common';
import { DistributorsResolver } from 'interface/graphql/resolver/distributors.resolver';
import { FilmsResolver } from 'interface/graphql/resolver/films.resolver';

@Module({
  // ! providers에 Resolver를 등록 해야 Resolver를 인식할 수 있다.
  providers: [
    DistributorsResolver,
    FilmsResolver,
    UsersResolver,
    PaymentsResolver,
  ],
})
export default class GraphqlModule {} // Resolver를 등록한 모듈을 GraphqlConfigModule의 import 옵션에 등록하면 GraphQL이 위 Resolver들을 인식할 수 있다.
