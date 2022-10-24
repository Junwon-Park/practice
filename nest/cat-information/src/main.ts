import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // Global level에서 발생하는 에러 예외처리를 필터링 한다.
  // 만약 존재하지 않는 URL로 접근하면 404 Not found 에러와 예외처리가 발생한다.
  await app.listen(8000);
}
bootstrap();
