import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import GraphqlModule from './graphql.module';

const graphqlErrorLog = new Logger('GraphQL Error log');

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
        const originalError = error.originalError;
        graphqlErrorLog.error(error);
        return originalError;
      },
      disableHealthCheck: true,
      path: path,
      context: ({ req, res }) => ({ req, res }),
    }),
  });
};
