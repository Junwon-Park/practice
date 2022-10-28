import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';
// import { v1 as uuid } from 'uuid'; // uuid 라이브러리의 v1 버전을 사용할 건데 이름을 uuid로 사용하도록 import 한 것이다.(유니크한 값을 만들어주는 라이브러리)
import { CreateBoarDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

// ? Service는 컨트롤러에서 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 처리한다.

@Injectable() // @Injectable() 데코레이터는 해당 NestJS 프로젝트 전체 어느 모듈에서든지 이 서비스를 사용할 수 있게 해준다.
// 이 데코레이터가 붙어 있는 모듈은 providers에 등록해야 사용 가능하며, 외부 모듈에서 사용하려면 exports에 등록하여 외부 모듈에서 imports 해서 사용할 수 있다.
// ! 서비스는 여러 컨트롤러에서 사용될 수 있고 어떤 컨트롤러에도 종속성 주입이 가능해야 하기 때문에 프로젝트 전체에서 사용할 수 있어야 한다. -> 종속성 주입을 가능하게 해준다.
// ! 그렇기 때문에 다른 모듈에서 이 서비스를 종속성 주입하여 사용하려면 @Injectable() 데코레이터로 감싸주어야 한다.
// ! 서비스는 NestJS에서 provider이고 provider는 종속성으로 주입할 수 있어야 하기 때문에 서비스 명령어로 서비스를 생성하면 자동으로 @Injectable() 데코레이터로 감싸진다.
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {} // 이 서비스에서 BoardRepository를 사용할 수 있도록 종속성 주입(@Injectable)
  // ! 레포지토리를 사용하기 위해 종속성 주입을 한 것이고 이렇게 종속성 주입을 해서 사용하기 위해 레포지토리는 @Injectable() 데코레이터로 감싸줘야 하는 것이다.

  createBoard(createBoardDto: CreateBoarDto, user: User): Promise<Board> {
    // Entity Repository에서 DB 작업을 처리해서 서비스로 넘겨주는 Repository Pattern을 적용한 메서드
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getAllBaords(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });

    if (!found) throw new NotFoundException(`Can't find Board with id ${id}`);

    return found;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    // const result = await this.boardRepository.delete({ id, userId: user.id });
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException(`Can't find with id ${id}`);

    console.log(result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id); // DB에 있는 해당 id를 가진 데이터
    board.status = status; // 해당 데이터의 특정 필드의 값을 변경

    await this.boardRepository.save(board); // 필드의 값을 변경한 해당 데이터 그 상태로 원래 위치에 저장

    return board;
  }

  //  // DB 적용 전 기존 코드
  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }
  //   createBoard(createBoarDto: CreateBoarDto): Board {
  //     const { title, description } = createBoarDto;
  //     const board: Board = {
  //       id: uuid(), // 유니크한 값을 생성하기 위해 uuid 라이브러리 사용
  //       title,
  //       description,
  //       status: BoardStatus.PUBLIC, // enum 타입 사용
  //     };
  //     this.boards.push(board);
  //     return board; // 생성한 게시물을 클라이언트에 응답으로 보내주기 위해 게시물을 컨트롤러로 반환한다.
  //   }
  //   getBoardById(id: string): Board {
  //     const found = this.boards.find((board) => board.id === id);
  //     if (!found) throw new NotFoundException(`Can't find Board with id ${id}`);
  //     // new NotFoundException() 인스턴스는 NestJS에 내장된 인스턴스이다.
  //     // 값이 없을 때, 404 Not Found 혹은 404 지정한 메세지를 반환하도록 해주는 예외처리 인스턴스이다.
  //     // 요청에 들어온 id를 찾지 못한 경우(해당 id를 가진 게시물이 없는 경우)에 대한 예외 처리를 해준 것이다.
  //     return found;
  //   }
  //   deleteBoardById(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   }
  //   updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
}
