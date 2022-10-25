import { LoginDto } from './../../dto/authUser.dto';
import { SignupDto } from '../../dto/authUser.dto';
import { UsersService } from './users.service';
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  // Loggers
  private signupLogger = new Logger('User controllers Signup');
  private loginLogger = new Logger('User controllers Login');

  constructor(private readonly usersService: UsersService) {}

  // Methods
  @Post('signup')
  signup(@Body() signupDto: SignupDto): {
    isSucceeded: boolean;
    Message: string;
  } {
    const {
      userLoginId,
      userPassword,
      userName,
      userAddress,
      userCellPhoneNumber,
      userEmail,
    } = signupDto;

    this.signupLogger.log({
      userLoginId,
      userPassword,
      userName,
      userAddress,
      userCellPhoneNumber,
      userEmail,
    });

    return this.usersService.signup(signupDto);
  }

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): {
    userInfo: {
      userId: number;
      userLoginId: string;
      userName: string;
      userAddress: string;
      userEmail: string;
    };
    Authorization: {
      accessToken: string;
      refreshToken: string;
    };
    isSucceeded: Boolean;
    Message: string;
  } {
    const { userLoginId } = loginDto;

    this.loginLogger.log(userLoginId);

    if (this.usersService.login(loginDto).isSucceeded) {
      return this.usersService.login(loginDto);
    } else {
      res.cookie('Authorization', null, { maxAge: 0 }); // ? maxAge: 0은 아에 쿠키를 없애버린다.
      res.status(401).json(this.usersService.login(loginDto));
    }
  }
}
