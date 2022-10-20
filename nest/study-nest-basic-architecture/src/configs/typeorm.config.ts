import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  // NestJS에서 제공하는 TypeOrmModuleOptions 객체 타입으로 객체를 생성하여 TypeORM Config 설정을 정의한다.
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  database: 'test_board',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Entity 파일 위치 -> **/: 모든 디렉토리의, *.entity: 모든이름.entity. 이라는 이름의 {js,ts}: 확장자가 js 또는 ts인 파일
  synchronize: true,
};
// 이렇게 정의한 TypeORM 설정 config 객체인 typeORMConfig를 메인 모듈인 app.module.ts의 @Module() 데코레이터의 imports에 TypeOrmModule.forRoot(typeORMConfig)을 추가해서 TypeORM의 Root module로 등록한다.
// TypeOrmModule 모듈은 @nestjs/typeorm에서 제공한다.
