import { Post } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../application/services/prisma/prisma.service';
import { FindUserPostsResDto } from 'src/interface/users/dto/res/findUserPostsRes.dto';
import * as dayjs from 'dayjs';

// Prisma timestamp UTC +09:00
const dbNow = () => dayjs().add(9, 'hour').toDate();
const now = dbNow();

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  // async signUp(email: string, name: string): Promise<User> {
  //   return await this.prisma.user.create({
  //     data: { email, name, time: now },
  //   });
  // }

  // async findUserPosts(userId: string): Promise<FindUserPostsResDto> {
  //   const userAndPosts: User & { posts: Post[] } =
  //     await this.prisma.user.findUnique({
  //       where: { id: userId },
  //       include: {
  //         posts: {
  //           orderBy: {
  //             id: 'desc',
  //           },
  //         },
  //       },
  //     });

  //   const usersPosts: FindUserPostsResDto = {
  //     succeeded: true,
  //     userName: userAndPosts.name,
  //     posts: userAndPosts.posts,
  //   };

  //   return usersPosts;
  // }
}
