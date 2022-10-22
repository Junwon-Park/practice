import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Repository, DataSource } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { CreateBoarDto } from './dto/create-board.dto';

@Injectable() // Repository는 서비스에 종속성 주입하여 사용해야 하기 때문에 @Injectable() 데코레이터 사용
export class BoardRepository extends Repository<Board> {
  // 이 클래스는 먼저 생성한 Board라는 Entity의 레포지토리이다.
  // Board entity 타입을 지정한 레포지토리 객체를 종속받는다.
  // 그러면 이 클래스는 Board라는 Entity의 Repository가 된다.
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
    // super를 사용하는 이유는 this에 데이터소스객체를 바로 할당해서 사용할 수 있게 하기 위함이다.
  }

  // 서비스의 createBoard() 메서드에서 처리할 DB 작업을 처리하는 메서드 -> 서비스의 DB 작업을 Repository에서 처리하고 결과를 서비스로 반환하는 설계 패턴을 레포지토리 패턴이라고 한다.
  async createBoard(createBoardDto: CreateBoarDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      // 해당 레포지토리 인스턴스의 create() 메서드
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });

    await this.save(board); // create() 메서드로 생성한 게시물을 save() 메서드로 저장해줘야 한다.

    return board;
  }
}
// 이렇게 생성한 레포지토리는 해당 모듈의 모듈이름.module.ts의 @Module() 데코레이터의 provider에 등록해야 해당 모듈의 레포지토리로 인식한다.
// NestJS에서 Repository는 provider 중 하나이다.(Service, Repository, Factory, Helper 등)
