import { PostsRepository } from './../../infra/mongo/repositories/posts.repository';
import { PostsService } from './../../application/services/posts/posts.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/application/services/prisma/prisma.service';
import { PostsResolver } from 'src/interface/posts/resovers/posts.resolver';

@Module({
  providers: [PostsResolver, PostsService, PostsRepository, PrismaService],
})
export class PostsModule {}
