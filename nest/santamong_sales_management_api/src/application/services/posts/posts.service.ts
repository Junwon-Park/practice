import { CreatePostResDto } from './../../../interface/posts/dto/res/createPostRes.dto';
import { CreatePostReqDto } from './../../../interface/posts/dto/req/createPostReq.dto';
import { PostsRepository } from './../../../infra/mongo/repositories/posts.repository';
import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  // async uploadPost(post: CreatePostReqDto): Promise<CreatePostResDto> {
  //   const createdPost: Post = await this.postsRepository.uploadPost(post);

  // const res = {
  //   succeeded: true,
  //   title: createdPost.title,
  //   context: createdPost.context,
  // };

  //   return;
  // }

  async posts() {
    return this.postsRepository.posts();
  }
}
