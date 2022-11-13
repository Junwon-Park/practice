import { Post } from '@prisma/client';

export class FindUserPostsResDto {
  succeeded: boolean;
  userName: string;
  posts: Post[];
}
