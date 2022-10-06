import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 서버가 실행되면 NestFactory.create()에 의해서 AppModule로 서버가 생성되고,
  // app.listen(Port)으로 지정한 포트로 서버가 열린다.
  // 클라이언트에서 요청을 보내면 처음으로 여기에서 실행된 서버로 들어오는데
  // 이 서버는 AppModule(app.module.ts)로 생성된 서버이기 때문에 해당 요청은 app.module.ts로 이동된다.
  const app = await NestFactory.create(AppModule); // 서버 생성
  await app.listen(3000); // 포트 개방
}
bootstrap(); // 서버 실행
