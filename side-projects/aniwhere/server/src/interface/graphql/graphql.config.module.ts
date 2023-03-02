import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import GraphqlModule from './graphql.module';

const graphqlErrorLog = new Logger('GraphQLErrorLog');

export const DefaultGraphQLModule = (path: string): DynamicModule => {
  return GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [GraphqlModule],
    useFactory: () => ({
      uploads: false,
      cors: true,
      validate: true,
      playground: true,
      autoSchemaFile: true,
      debug: true,
      // introspection: false,
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        graphqlErrorLog.error(error);

        return error;
      },
      disableHealthCheck: true,
      path: path,
      context: ({ req, res }) => ({ req, res }),
    }),
  });
};
