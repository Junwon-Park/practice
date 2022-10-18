import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';

// app.modules.ts 파일에서는 모듈을 등록할 수 있다.
// NestJS 프로젝트에 앞으로 생성되는 모든 모듈은 이 모듈에 등럭되어야 한다.
// 즉, app.module.ts가 NestJS 앱의 Root module이고 앞으로 생성되는 모듈은 모두 여기에 추가되어 app.module.ts에 속하게 된다.
@Module({
  // 모듈을 등록하는 부분
  imports: [BoardsModule], // 이 부분에 앞으로 생성되는 모듈이 등록된다.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
