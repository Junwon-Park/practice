import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // NestJS에서 제공하는 TypeORM 라이브러리
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';

// ! app.module.ts는 Root module 파일이다. NestJS 프로젝트의 전역 모듈 등록 파일이라고 할 수 있다.
// ! 그리고 각 도메인 모듈 내에 있는 .module.ts 파일은 해당 모듈의 지역 모듈 등록 파일이라고 할 수 있다.
// app.module.ts 파일에서는 이 프로젝트 전체 모듈에서 사용할 모듈을 등록할 수 있다.
// NestJS 프로젝트에 앞으로 생성되는 모든 도메인 모듈과 프로젝트 전역에 사용될 라이브러리 모듈은 이 모듈 파일의 imports에 등럭되어야 한다.
// 즉, app.module.ts가 NestJS 앱의 Root module이고 앞으로 생성되는 도메인 모듈과 프로젝트 전역에 사용될 라이브러리 모듈은 모두 여기에 추가되어 app.module.ts에 속하게 된다.
@Module({
  // 모듈을 등록하는 부분
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    // @nestjs/typeorm 라이브러리의 TypeOrmModule 모듈의 forRoot() 메서드에 typeORM 구성 요소를 정리한 typeORMConfig를 등록하여 이 프로젝트에서 설정한 구성으로 TypeORM을 사용할 수 있도록 한다.
    BoardsModule,
    AuthModule,
  ], // 이 부분에 앞으로 생성되는 모듈이 등록된다.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
