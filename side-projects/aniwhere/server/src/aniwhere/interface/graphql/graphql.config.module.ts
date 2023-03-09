import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import GraphqlModule from 'aniwhere/interface/graphql/graphql.module';

const graphqlErrorLog = new Logger('GraphQLErrorLog');

export const DefaultGraphQLModule = (path: string): DynamicModule => {
  return GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [GraphqlModule], // Resolver를 import하고 있는 모듈 import(imports에 등록한 모듈에서 Resolver들을 exports에 등록하지 않아도 인식한다.(일단 현재 까지는?))
    useFactory: () => ({
      uploads: false,
      cors: true,
      validate: true,
      playground: true, //  GraphQL playground 활성화
      autoSchemaFile: true, // gql 파일에 스키마를 생성하지 않고, 앱 실행 시 메모리에 자동 생성(Default: false)
      debug: true,
      // introspection: false,
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        graphqlErrorLog.error(error); // 서버 찍히는 로그
        return error; // 클라이언트에 내려주는 에러 객체
      },
      disableHealthCheck: true,
      path: path, // URL end point
      // TODO: 아래 context 옵션은 나중에 미들웨어(가드, 인터셉터 등) 달 때, ExecutionContext(req, res) 잘 가져와 지는 지 확인해보기(GraphQL의 ExecutionContext를 여기에서 가져오는 것인지 확인 필요)
      context: ({ req, res }) => ({ req, res }),
    }),
  });
};
