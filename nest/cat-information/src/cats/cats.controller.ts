import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

@Controller('cats')
@UseInterceptors(SuccessInterceptor) // 컨트롤러 레벨에서 인터셉터 등록
@UseFilters(HttpExceptionFilter) // 아래 함수(핸들러)에서 여기에 등록된 예외처리 객체외 동일한 예외처리 객체가 발동되면 이 필터에서 캐치한다.
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

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

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) id: number) {
    // id가 number type인지 검증하는 파이프 등록(number 타입이 아닐 시, 400 Bad Request)
    return 'One cat API';
  }

  @Post()
  createCat() {
    return 'Create cat API';
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
