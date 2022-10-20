import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // NestJS에서 제공하는 TypeORM 라이브러리
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

// app.modules.ts 파일에서는 모듈을 등록할 수 있다.
// NestJS 프로젝트에 앞으로 생성되는 모든 모듈은 이 모듈에 등럭되어야 한다.
// 즉, app.module.ts가 NestJS 앱의 Root module이고 앞으로 생성되는 모듈은 모두 여기에 추가되어 app.module.ts에 속하게 된다.
@Module({
  // 모듈을 등록하는 부분
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // @nestjs/typeorm 라이브러리의 TypeOrmModule 모듈의 forRoot() 메서드에 typeORM 구성 요소를 정리한 typeORMConfig를 등록하여 이 프로젝트에서 설정한 구성으로 TypeORM을 사용할 수 있도록 한다.
    BoardsModule, AuthModule,
  ], // 이 부분에 앞으로 생성되는 모듈이 등록된다.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
