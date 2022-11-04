import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // 컨트롤러 레벨에서 인터셉터 등록
@UseFilters(HttpExceptionFilter) // 아래 함수(핸들러)에서 여기에 등록된 예외처리 객체외 동일한 예외처리 객체가 발동되면 이 필터에서 캐치한다.
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getAllCat() {
    console.log('Hello controller');
    // throw new HttpException('API is broken', 401);

    // throw new HttpException(
    //   { success: false, message: 'API is broken' },
    //   HttpStatus.FORBIDDEN,
    // ); // 이렇게 JSON 형태 또는 원하는 형태로 오버라이딩이 가능하다.(에러 응답 커스텀)
    // // HttpStatus 클래스의 FORBIDDEN 속성의 값은 403 Forbidden이다.

    return 'All cats API';
  }

  @Get('/auth')
  @UseGuards(JwtAuthGuard) // 이 부분에서 JwtStrategy가 수행되고 반환 값이 핸들러의 인자로 들어가게 된다.
  getCurrentCat(@Req() req: Request) {
    console.log('here auth');

    return req.user;
  }

  @Post('/signup')
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.singUp(body);
  }

  @Post('login')
  logIn(@Body() loginData: LoginRequestDto) {
    return this.authService.jwtLogIn(loginData);
  }

  @Put(':id')
  updateCat() {
    return 'Update cat API';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'Update partial cat API';
  }

  @Delete(':id')
  deleteCat() {
    return 'Delete service API';
  }
}
