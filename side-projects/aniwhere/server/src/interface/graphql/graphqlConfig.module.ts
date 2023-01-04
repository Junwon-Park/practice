import { PaymentsResolver } from './resolver/payments.resolver';
import { UsersResolver } from './resolver/users.resolver';
import { Module } from '@nestjs/common';
import { DistributorsResolver } from './resolver/distributors.resolver';
import { FilmsResolver } from './resolver/films.resolver';

@Module({
  // ! providers에 Resolver를 등록 해야 Resolver를 인식할 수 있다.(AppModule에 이 모듈을 import하지 않고 이 providers에만 Resolver를 등록하면 정상 동작한다.)
  providers: [
    DistributorsResolver,
    FilmsResolver,
    UsersResolver,
    PaymentsResolver,
  ],
})
export class GraphqlConfigModule {}
