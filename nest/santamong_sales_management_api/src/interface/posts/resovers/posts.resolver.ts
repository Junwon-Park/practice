import { PostsService } from '../../../application/services/posts/posts.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query('posts')
  async posts() {
    return this.postsService.posts();
  }

  // @Post('uploadpost')
  // async uploadPost(@Body() post: CreatePostReqDto): Promise<CreatePostResDto> {
  //   console.log('Uploadpost controller', post);

  //   return this.postsService.uploadPost(post);
  // }
}
