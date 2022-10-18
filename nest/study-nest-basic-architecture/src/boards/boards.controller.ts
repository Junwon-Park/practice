import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  // boards 모듈의 컨트롤러 클래스
  // 이 내부에 boards 모듈의 컨트롤러의 핸들러(Handler)를 작성해준댜.
  // ! Controller 클래스 내부에 HTTP 메서드 데코레이터 등과 함께 작성된 메서드를 핸들러라고 하고 핸들러는 들어온 요청을 서비스(Service)로 라우팅하고 서비스에서 반환된 값을 응답으로 반환하는 역할을 한다.
  constructor(private boardsService: BoardsService) {}
}

// 컨트롤러에서는 아래와 같이 서비스를 불러와(import) 컨트롤러 클래스의 생성자에서 파라미터 인자로 받아 그 것을 속성에 할당하여 사용할 수 있도록 한다.
// 컨트롤러에서는 필요한 여러 서비스를 가져다가 사용하게 되는데, 이 것을 Dependency Injection(DI) 종속성 주입이라고 한다.
// ! 원래는 아래 처럼 boardsService: BoardsService;와 같이 클래스의 속성을 먼저 타입과 함께 선언하고 생성자 함수 내에서 해당 속성을 this.boardsService로 불러와
// ! 생성자 함수의 파라미터 인자를 할당해야 했던 것이 위 처럼 접근 제한자(private, public)를 사용하면 암묵적으로 해당 파라미터가 프로퍼티로 선언된 것과 동일하게 동작한다.
// @Controller('boards')
// export class BoardsController {
//   boardsService: BoardsService;

//   constructor(boardsService: BoardsService) {
//     this.boardsService = boardsService;
//   }
// }
