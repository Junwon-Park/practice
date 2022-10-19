import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid'; // uuid 라이브러리의 v1 버전을 사용할 건데 이름을 uuid로 사용하도록 import 한 것이다.(유니크한 값을 만들어주는 라이브러리)
import { CreateBoarDto } from './dto/create-board.dto';

// ? Service는 컨트롤러에서 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 처리한다.

@Injectable() // @Injectable() 데코레이터는 해당 NestJS 프로젝트 전체 어느 모듈에서든지 이 서비스를 사용할 수 있게 해준다.
// ! 서비스는 여러 컨트롤러에서 사용될 수 있고 어떤 컨트롤러에도 종속성 주입이 가능해야 하기 때문에 프로젝트 전체에서 사용할 수 있어야 한다. -> 종속성 주입을 가능하게 해준다.
// ! 그렇기 때문에 다른 모듈에서 이 서비스를 종속성 주입하여 사용하려면 @Injectable() 데코레이터로 감싸주어야 한다.
// ! 서비스는 NestJS에서 provider이고 provider는 종속성으로 주입할 수 있어야 하기 때문에 서비스 명령어로 서비스를 생성하면 자동으로 @Injectable() 데코레이터로 감싸진다.
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoarDto: CreateBoarDto): Board {
    const { title, description } = createBoarDto;

    const board: Board = {
      id: uuid(), // 유니크한 값을 생성하기 위해 uuid 라이브러리 사용
      title,
      description,
      status: BoardStatus.PUBLIC, // enum 타입 사용
    };

    this.boards.push(board);
    return board; // 생성한 게시물을 클라이언트에 응답으로 보내주기 위해 게시물을 컨트롤러로 반환한다.
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoardById(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;

    return board;
  }
}
