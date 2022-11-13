import { UsersModule } from './configs/modules/users.module';
import { PrismaService } from './application/services/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PostsModule } from './configs/modules/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [process.env.TYPE_PATH],
      definitions: {
        path: join(process.cwd(), process.env.DEFINITION_PATH),
        outputAs: 'class',
      },
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
