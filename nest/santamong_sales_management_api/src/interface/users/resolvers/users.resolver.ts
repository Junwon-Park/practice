import { UsersService } from '../../../application/services/users/users.service';
import { Resolver } from '@nestjs/graphql';

@Resolver('users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  // @ApiResponse({
  //   status: 500,
  //   description: 'Server error!',
  // })
  // @ApiResponse({
  //   status: 409,
  //   description: 'Signup is failed!',
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Success!',
  //   type: CreateUserResDto,
  // })
  // @ApiOperation({ summary: '회원가입' })
  // @Post('signup')
  // async signUp(@Body() userData: createUserReqDto): Promise<CreateUserResDto> {
  //   console.log('userData');
  //   return await this.userService.signUp(userData);
  // }

  // @ApiResponse({
  //   status: 500,
  //   description: 'Server error!',
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Success!',
  //   type: FindUserPostsResDto,
  // })
  // @ApiOperation({ summary: '회원이 작성한 소식 모아 보기' })
  // @Post('finduserpost')
  // async findUserPost(
  //   @Body() idObj: FindUserPostsReqDto,
  // ): Promise<FindUserPostsResDto> {
  //   return this.userService.findUserPosts(idObj);
  // }
}
