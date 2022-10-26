import { AuthToken } from '../../common/utils/authToken.util';
import {
  LoginDto,
  CheckCertifiedDto,
  EditPasswordDto,
  EditMyInfoDto,
  DeleteMineDto,
} from './../../dto/authUser.dto';
import { SignupDto } from '../../dto/authUser.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Logger,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  // Loggers
  private signupLogger = new Logger('User controllers signup');
  private loginLogger = new Logger('User controllers login');
  private checkCertifiedLogger = new Logger(
    'User Controllers checkCertifiedUser',
  );
  private editMyInfoLogger = new Logger('User contorllers editMyInfo');
  private deleteMineLogger = new Logger('User controllers deleteMine');

  constructor(
    private readonly usersService: UsersService,
    private readonly authToken: AuthToken,
  ) {}

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
    @Req() req: Request,
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

    this.loginLogger.log(
      `User login id: "${userLoginId}", Request method: "${req.method}"`,
    );

    const loginResult = this.usersService.login(loginDto);

    if (loginResult.isSucceeded) {
      return loginResult;
    } else {
      res.cookie('Authorization', null, { maxAge: 0 }); // maxAge: 0은 아에 쿠키를 없애버린다.
      res.status(401).json(loginResult);
    }
  }

  @Post('auth/additional')
  checkCertifiedUser(
    @Body() checkCertifiedDto: CheckCertifiedDto,
    @Res() res: Response,
  ): void {
    this.checkCertifiedLogger.log(checkCertifiedDto);

    const checkCertifiedUser =
      this.usersService.checkCertifiedUser(checkCertifiedDto);

    if (!checkCertifiedUser.isSucceeded) {
      res.cookie('authKey', null, {
        maxAge: 0, // 쿠키 삭제
      });

      res.status(401).json(checkCertifiedUser);
    } else {
      const { userLoginId, userPassword } = checkCertifiedDto;

      res.cookie(
        'authKey',
        this.authToken.createAtuhKey(userLoginId, userPassword), // Sub auth key 생성
        {
          httpOnly: true,
          sameSite: 'none',
          maxAge: 24 * 60 * 60 * 1000, // 1d
        },
      );

      res.json(checkCertifiedUser);
    }
  }

  @Put('mine/password')
  editPassword(
    @Body() editPasswordDto: EditPasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ): void {
    console.log(req.cookies);

    const resultEditPassword = this.usersService.editPassword(
      editPasswordDto,
      req.cookies,
    );

    if (!resultEditPassword.isSucceeded) {
      res.cookie('accessToken', null, { maxAge: 0 });
      res.cookie('authKey', null, { maxAge: 0 });
      res.status(401).json(resultEditPassword);
    } else {
      res.json(resultEditPassword);
    }
  }

  @Put('mine/profile')
  editMyInfo(
    @Body() editMyInfoDto: EditMyInfoDto,
    @Req() req: Request,
  ):
    | {
        userInfo: {
          userLoginId: string;
          userName: string;
          userAddress: string;
          userEmail: string;
        };
        isSucceeded: boolean;
        Message: string;
        userLastModifiedDate: Date;
      }
    | { isSucceeded: boolean; Message: string } {
    const { authKey } = req.cookies;
    this.editMyInfoLogger.log(`Edit my info authKey ${authKey}`);

    return this.usersService.editMyInfo(editMyInfoDto, authKey);
  }

  //   @Delete('mine')
  //   deleteMine(@Body() deleteMineDto: DeleteMineDto, @Req() req: Request): void {
  //     this.usersService.deleteMine(this.deleteMine(deleteMineDto));
  //   }
}
