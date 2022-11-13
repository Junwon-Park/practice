import { CreatePostReqDto } from './../../../interface/posts/dto/req/createPostReq.dto';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/application/services/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  async posts() {
    return await this.prisma.post.findMany();
  }

  // async uploadPost(post: CreatePostReqDto): Promise<Post> {
  //   const createdPost = await this.prisma.post.create({ data: post });

  //   return createdPost;
  // }
}
