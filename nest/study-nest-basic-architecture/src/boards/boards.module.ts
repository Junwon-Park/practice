// 게시판이 될 boards라는 모듈을 생성했다.
// 생성은 nest g module boards 라고 명령어를 입력하면 자동으로 생성해준다.
// ! 명령어를 해석해보면 nest: nest-cli를 사용해서 / g: generate(생성) 한다. / module: 모듈을 / boards: boards라는 (모듈을..)
// 그러면 src 디렉토리에 boards라는 이름의 디렉토리와 내부에 boards.module.ts 파일에 기본적인 모듈의 구조가 작성되어 생성된다.
// 그리고 이렇게 생성된 모듈은 app.module.ts의 @Module() 데코레이터의 imports 속성에 자동으로 추가된다.
// boards라는 디렉토리(boards 모듈)의 boards.module.ts는 boards 모듈의 root module이다.
// ! 이제 다음 작업으로는 요청이 오면 요청을 처리하고 응답을 반환하는 controller를 생성한다.
// boards 모듈의 컨트롤러를 생성하기 위해 아래 명령어를 입력한다.
// nest g controller boards --no-spec
// ! 명령어를 해석하면 nest: nest-cli를 사용해서 / g: 생성한다. / controller: controller를 / boards: boards라는 모듈의(이름이 동일한 모듈을 인식하여 찾아간다.) (컨트롤러를) / --no-spec(Option): 해당 컨트롤러를 테스트하기 위한 스펙 파일과 소스를 생성하지 않는 옵션.
// 생성된 컨트롤러는 이래 @Module() 데코레이터의 controllers라는 속성에 생성한 컨트롤러가 자동으로 등록되었다.
// ! 그 다음 작업으로는 Controller로 부터 요청을 라우팅 받아 데이터베이스 관련 로직을 처리할 Service를 생성한다.
// boards의 서비스를 생성하기 위해 아래 명령어를 입력한다.
// nest g service boards --no-spec
// ! 명령어를 해석하면 nest: nest-cli를 사용해서 / g: 생성한다. / service: service를 / boards라는 모듈의(이름이 동일한 모듈을 인식하여 찾아간다.) (서비스를) / --no-spec: 해당 서비스를 테스트하기 위한 스펙 파일과 소스를 생성하지 않는 옵션.
// 여기에서 컨트롤러와 서비스를 테스트하기 위한 각각의 스펙 파일은 지금은 구조를 학습하기 위한 프로젝트이기 때문에 아직 필요하지 않아 생성하지 않는 것이다. 필요하다면 생성하면 된다.
// 스펙 파일은 TDD(Jest) 파일이다.
// ! 생성된 서비스 모듈은 컨트롤러와 마찬가지로 @Moudle() 데코레이터에 등록되는데, service라는 속성 이름이 아닌 providers라는 속성에 등록된다.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board])], // Board 모듈에 TypeORM에 사용될 Board repository를 등록하여 사용할 수 있도록 했다.
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
  // provider란, Nest의 기본 개념이다.
  // ! 대부분의 기본 Nest의 클래스는 Service, Repository, Factory, Helper 등의 provider로써 취급될 수 있다.
  // NestJS에서 Service, Repository, Factory, Helper 등을 통틀어 provider라고 한다.
  // ! provider의 주요 아이디어는 종속성으로써 주입할 수 있다는 것이다.
})
export class BoardsModule {}
