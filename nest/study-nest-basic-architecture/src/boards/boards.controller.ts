import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { BoardsService } from './boards.service'; // 이 컨트롤러에 종속성 주입할 서비스 import
import { CreateBoarDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards') // localhost:3000/boards
export class BoardsController {
  //   // boards 모듈의 컨트롤러 클래스
  //   // 이 내부에 boards 모듈의 컨트롤러의 핸들러(Handler)를 작성해준댜.
  //   // ! Controller 클래스 내부에는 HTTP 메서드(GET, POST, PUT, DELETE) 데코레이터 등과 함께 작성된 메서드를 핸들러라고 하고 컨트롤러는 들어온 요청을 요청 경로에 맞는 핸들러로 라우팅 해주고
  //   // ! 핸들러는 들어온 요청을 서비스(Service)로 보내주고 서비스에서 로직을 처리해준 후, 그 결과를 다시 컨트롤러로 반환해주면 컨트롤러는 그 반환된 값을 클라이언트에게 응답으로 반환하는 역할을 한다.
  constructor(private boardsService: BoardsService) {
    // 컨트롤러 객체의 생성자 함수의 파라미터로 서비스를 받아 해당 서비스를 컨트롤러에 종속성 주입하여 사용한다.
  }
  //   @Get() // 아무 경로도 넣지 않으면 기본 값은 '/'(Root)이다.
  //   getAllBoard() {
  //     return this.boardsService.getAllBoards();
  //   }

  //   //   @Post()
  //   //   createBoard(
  //   //     // POST 요청일 때, 요청의 Body에 접근하기 위해서 @Body 데코레이터를 사용한다.
  //   //     @Body('title') title: string, // 요청의 Body에 title이라는 필드를 title이라는 stirng 타입의 파라미터로 맏는다.
  //   //     @Body('description') description: string, // 요청의 Body에 description이라는 필드를 description이라는 string 타입의 파라미터로 받는다.
  //   //   ): Board {
  //   //     return this.boardsService.createBoard(title, description); // 이 메서드는 두 개의 string 타입의 인자를 받는다.
  //   //   }
  //   // }

  //   @Post()
  //   @UsePipes(ValidationPipe) // @UsePipes는 NestJS에서 제공하는 Handler level의 파이프를 사용할 수 있는 데코레이터이다.
  //   // ValidationPipe는 NestJS 내장 유효성 검사 파이프이다.
  //   // 이 핸들러에서 CreateBoarDto를 사용하기 때문에 여기에 Handler level의 유효성 검사 파이프를 등록하면 CreateBoarDto에 넣어준 유효성 검사를 수행한 뒤 핸들러로 넘겨준다.
  //   createBoard(
  //     // POST 요청일 때, 요청의 Body에 접근하기 위해서 @Body 데코레이터를 사용한다.
  //     @Body() createBoarDto: CreateBoarDto, // !  Body에 들어온 필드가 DTO에 정의된 필드와 동일하다면 이를 인식하여 받을 수 있다.
  //   ): Board {
  //     return this.boardsService.createBoard(createBoarDto); // 이 메서드는 두 개의 string 타입의 인자를 받는다.
  //   }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoarDto: CreateBoarDto): Promise<Board> {
    return this.boardsService.createBoard(createBoarDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  //   @Get('/:id') // localhost:3000/boards?id=아이디 값
  //   createBoardById(@Param('id') id: string): Board {
  //     // @Param('id')는 id라는 특정 필드를 지정하는 것이고, 여러 개의 Params를 받으려면 아래 처럼 특정 필드를 지정하지 않고 배열로 받으면 된다.
  //     // @Param() params: string[] -> string 타입의 배열로 받는다. 당연히 params라는 파라미터는 변수명이기 때문에 다르게 작성해도 된다.
  //     // localhost:3000/boards?id=아이디 값&title=제목 값
  //     return this.boardsService.getBoardById(id);
  //   }

  //   @Delete('/:id')
  //   deleteBoardById(@Param('id') id: string): void {
  //     this.boardsService.deleteBoardById(id);
  //   }

  //   @Patch('/:id/status')
  //   updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  //   ): Board {
  //     return this.boardsService.updateBoardStatus(id, status);
  //   }
  // }

  // // 컨트롤러에서는 아래와 같이 서비스를 불러와(import) 컨트롤러 클래스의 생성자에서 파라미터 인자로 받아 그 것을 속성에 할당하여 사용할 수 있도록 한다.
  // // 컨트롤러에서는 필요한 여러 서비스를 가져다가 사용하게 되는데, 이 것을 Dependency Injection(DI) 종속성 주입이라고 한다.
  // // ! 원래는 아래 처럼 boardsService: BoardsService;와 같이 클래스의 속성을 먼저 타입과 함께 선언하고 생성자 함수 내에서 해당 속성을 this.boardsService로 불러와
  // // ! 생성자 함수의 파라미터 인자를 할당해야 했던 것이 위 처럼 접근 제한자(private, public)를 사용하면 암묵적으로 해당 파라미터가 프로퍼티로 선언된다.
  // // @Controller('boards')
  // // export class BoardsController {
  // //   boardsService: BoardsService;

  // //   constructor(boardsService: BoardsService) {
  // //     this.boardsService = boardsService;
  // //   }
  // // }
}
