import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { DefaultGraphQLModule } from 'interface/graphql/graphql.config.module';
import { AniwhereModule } from 'domain/modules/aniwhere.module';

@Module({
  imports: [AniwhereModule, DefaultGraphQLModule('/aniwhere')],
})
export class AppModule {}
