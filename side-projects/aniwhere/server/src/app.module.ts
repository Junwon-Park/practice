import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import GraphqlConfigModule from './interface/graphql/graphql.config.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './config/modules/users.module';
import { FilmsModule } from './config/modules/films.module';
import { DistributorsModule } from './config/modules/distributors.module';
import { PaymentsModule } from './config/modules/payments.module';
import EnvConfigModule from 'env/env.module';
import MongodbModule from './infrastructure/mongodb/mongodb.module';

@Module({
  imports: [
    EnvConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      // ? TODO: imports에 GraphqlConfigModule 등록 안해도 잘 되는데, 추후에도 없어도 되는 지 확인해보기
      imports: [GraphqlConfigModule], // Resolver를 가지고 있는 모듈 import(imports에 등록한 모듈에서 Resolver들을 exports에 등록하지 않아도 인식한다.(일단 현재 까지는?))
      useFactory: () => ({
        uploads: false,
        cors: true,
        validate: true,
        playground: true, //  GraphQL playground 활성화
        autoSchemaFile: true, // gql 파일에 스키마를 생성하지 않고, 앱 실행 시 메모리에 자동 생성(Default: false)
        debug: false,
        disableHealthCheck: true,
        path: '/aniwhere', // URL end point
        // TODO: 아래 context 나중에 미들웨어(가드, 인터셉터 등) 달 때, ExecutionContext(req, res) 잘 가져와 지는 지 확인해보기(ExecutionContext를 여기에서 가져오는 것인지 확인 필요)
        context: ({ req, res }) => ({ req, res }),
      }),
    }),
    MongodbModule,
    UsersModule,
    FilmsModule,
    DistributorsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
