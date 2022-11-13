// import { User } from '@prisma/client';
import { createUserReqDto } from '../../../interface/users/dto/req/createUserReq.dto';
import { UsersRepository } from '../../../infra/mongo/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserResDto } from 'src/interface/users/dto/res/createUserRes.dto';
import { FindUserPostsResDto } from 'src/interface/users/dto/res/findUserPostsRes.dto';
import { FindUserPostsReqDto } from './../../../interface/users/dto/req/findUserPostsReq.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // async signUp(userInfo: createUserReqDto): Promise<CreateUserResDto> {
  //   const { email, name } = userInfo;

  //   const user: User = await this.usersRepository.signUp(email, name);

  //   const res: CreateUserResDto = {
  //     succeeded: true,
  //     email: user.email,
  //     name: user.name,
  //   };

  //   return res;
  // }

  // async findUserPosts(
  //   idObj: FindUserPostsReqDto,
  // ): Promise<FindUserPostsResDto> {
  //   const { userId } = idObj;

  //   return this.usersRepository.findUserPosts(userId);
  // }
}
