import {
  Body,
  Controller,
  Logger,
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
  private logger = new Logger('Auth');

  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialDto: AtuhCredentialDto): Promise<void> {
    this.logger.verbose(
      `User "${authCredentialDto.username}" is trying to signup`,
    );

    return this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  signIn(
    @Body() authCredentialDto: AtuhCredentialDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `User "${authCredentialDto.username}" is trying to signin`,
    );

    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // @UseGuards()는 NestJS에서 기본 제공하는 인증 관련 Guard 미들웨어 등록 데코레이터이다.
  // ! auth.module.ts에서 passportModule의 register() 메서드의 옵션으로 defaultStrategy: 'jwt'을 줘서 기본 전략이 JWT가 됐기 때문에 AuthGuard()의 인자를 전달하지 않으면 기본적으로 JWT이다.
  // ! auth.module.ts에서 passportModule의 register() 메서드의 옵션으로 defaultStrategy를 지정하지 않았다면 AuthGuard('jwt')라고 전략을 명시해줘야 한다.
  // AuthGuard() 메서드는 @nestjs/passport에서 제공하는 인증 관련 미들웨어이고 PassportStrategy()을 상속받는 Strategy 모듈로 요청을 넘겨 인증하는 기능을 한다.
  // 이 미들웨어가 등록되어 있으면 인증된 요청만 핸들러에 접근할 수 있다.
  test(@GetUser() user: User) {
    // AuthGuard()에서 반환한 Request 객체에는 AuthGuard()에서 반환하는 데이터 객체가 포함되어 있는데, 해당 핸들러 내부에서 요청 객체에 포함된 AuthGuard()에서 반환하는 데이터 객체를 바로 사용하고 싶다면 커스텀 데코레이터를 사용할 수 있다.
    // @GetUser()는 유저 객체를 반환하도록 만든 커스텀 Param 데코레이터이다.(createParamDecorator() 메서드로 생성한 Param Decorator)
    // ! 파라미터 레벨에서 사용할 수 있는 데코레이터를 Param Decorator라고 하며 데코레이터는 클래스가 아닌 함수 모듈이다.
    // 데코레이터는 .module.ts 파일의 providers에 등록하지 않고 바로 import할 수 있다.
    // 요청이 들어오면 메서드(핸들러) 위에 등록되어 있는 핸들러 레벨의 데코레이터를 거쳐 핸들러의 인자로 요청이 들어오게 되고 핸들러의 파라미터에 데코레이터가 있다면 해당 요청은 데코레이터로 들어가게 된다.
    // 그리고 그 반환 값이 해당 데코레이터의 파라미터로 들어가게 된다.(위에서는 test()의 인자 user: User에 @GetUser() 데코레이터가 붙은 형태이고 @GetUser()의 반환 값이 user: User에 할당된다.)
    console.log('user', user);
  }
}
