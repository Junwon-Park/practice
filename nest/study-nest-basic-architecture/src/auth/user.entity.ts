import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['username']) // 이 Entity의 username 필드는 고유한 값이어야 한다.
// Unique 데코레이션에 필드를 등록하면 이 Entity로 요청이 들어왔을 때, 해당 필드의 값이 고유한 값이 해당 Entity의 DB 테이블에 존재하는지 체크한다.
// 만약 동일한 username으로 요청이 들어온다면 DB 단에서 에러가 발생한다.(이렇게 하지 않을 경우 해당 필드의 값과 동일한 데이터의 값이 존재한다는 로직을 직접 작성해야 한다.)
// 발생한 에러는 DB를 다루는 곳(Service 또는 Repository, 여기에서는 Repository pattern으로 구현하기 때문에 Repository)에서 예외처리 한다.
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(
    // 이렇게 양쪽에 OneToMany-ManyToOne으로 지정해 놓으면 one인 쪽의 id(PK)를 Many인 쪽에 새로운 컬럼이 자동으로 생성(userId, FK)되 해당 컬럼에서 참조하게 된다.
    (type) => Board, // 상대 엔티티 타입이다.
    (board) => board.user, // 상대 엔티티(board)에서 이 엔티티(user)에 어떻게 접근할 수 있는 지 정의한 것이다.
    // 상대에도 이 엔티티에 접근하는 방법을 정의해주지 않으면 에러가 난다.(정의해주면 에러는 사라진다.)
    { eager: true }, // eager: true는 관계를 맺은 두 엔티티 중 상대의 연관된 모든 데이터를 가져온다는 의미이다.
    // 여기에서는 유저가 작성한 모든 게시물(Board)을 가져오도록 한 것이다.
    // eager 옵션은 Eager Loading을 의미하는데 처음 로딩 시 양쪽 엔티티 간의 참조하는 모든 데이터를 미리 가져오는 것이다.
    // 이 옵션을 양쪽 모두에 true 값을 줄 수 없고 한 쪽에만 줄 수 있으며 이 값이 true면 true인 쪽 데이터를 기준으로 상대 데이터를 조인해서 가져온다.
    // Left join 개념으로 보면 이 값을 true로 지정한 쪽이 Left가 된다.
    // 상대 엔티티에서는 이 값을 false로 하거나 아에 옵션을 지정하지 않으면 된다.
  )
  boards: Board[];
}
