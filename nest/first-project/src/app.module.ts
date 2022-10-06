import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // main.ts에서 들어온 요청은 컨트롤러(AppController)로 이동된다.
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
