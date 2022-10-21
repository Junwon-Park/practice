import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AtuhCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialDto: AtuhCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() authdtoCredential: AtuhCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authdtoCredential);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // @UseGuards()는 NestJS에서 기본 제공하는 인증 관련 미들웨어 등록 데코레이터이다.
  // AuthGuard() 메서드는 @nestjs/passport에서 제공하는 인증 관련 미들웨어이고 PassportStrategy()을 상속받는 Strategy 모듈로 요청을 넘겨 인증하는 기능을 한다.
  // 이 미들웨어가 등록되어 있으면 인증된 요청만 핸들러에 접근할 수 있다.
  test(@GetUser() user: User) {
    console.log('user', user);
  }
}
