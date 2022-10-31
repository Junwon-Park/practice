import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 각 스키마 또는 DTO에 대한 유효성 검사를 글로벌 레벨에서 수행하기 위해 main.ts의 bootstrap()에 app.useGlobalPipes()에 등록한다.
  // 특정 컨트롤러 또는 핸들러 레벨에서 유효성 검사를 수행하려면 해당 컨트롤러 또는 핸들러에 @UsePipes() 데코레이터로 등록하여 컨트롤러 레벨 또는 핸드럴 레벨에서 유효성 검사를 수행할 수 있다.
  app.useGlobalFilters(new HttpExceptionFilter()); // Global level에서 발생하는 에러 예외처리를 필터링 한다.
  // 만약 존재하지 않는 URL로 접근하면 404 Not found 에러와 예외처리가 발생한다.

  const PROT = process.env.PORT;
  await app.listen(PROT);
}
bootstrap();
