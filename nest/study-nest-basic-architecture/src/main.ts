// ! NestJS 앱을 실행하면 가장 먼저 main.ts 파일이 실행된다.
// Entry point라고도 한다.(main.ts는 NestJS 앱의 엔트리 포인트이다.)
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // app.module.ts 모듈을 기반으로 Nest 앱이 생성된다.
  const port = 3000;
  await app.listen(port); // 생성된 앱을 3000번 포트로 오픈한다.
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
