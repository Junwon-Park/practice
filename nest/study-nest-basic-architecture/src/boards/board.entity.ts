import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { BoardStatus } from './board.status.enum';

@Entity() // @Entity() 데코레이터로 감싸서 이 클래스가 Entity임을 알려준다.
export class Board extends BaseEntity {
  // 이 클래스를 TypeORM이 사용할 수 있는 Entity로써 사용하려면 TypeORM의 BaseEntity 객체를 종속받아야 한다.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(
    // 이렇게 양쪽에 OneToMany-ManyToOne으로 지정해 놓으면 one인 쪽의 id(PK)를 Many인 쪽에 새로운 컬럼이 자동으로 생성(userId, FK)되 해당 컬럼에서 참조하게 된다.
    (type) => User, // 상대 엔티티의 타입이다.(참조 관계인 상대 엔티티의 타입)
    (user) => user.boards, // 이 엔티티에서 상대 엔티티로 어떻게 접근할 수 있는 지를 정의한 것이다.(여기의 user는 첫 번째 파라미터인 type에 지정한 User 타입이다.)
    { eager: false }, // 1 대 N에서 N인 엔티티가 eager: true, 1인 엔티티가 eager: false이다.
  )
  user: User; // 관계 데코레이터가 붙어있기 때문에 DB에 실제로 이 필드가 생성되지는 않는다.
  // Board는 한 명의 유저만 가질 수 있기 때문에 User 타입이다.
  // 반대로 상대 엔티티에서는 한 명의 User가 여러 게시물을 작성(가질 수)할 수 있기 떄문에 Board[] 배열 타입으로 지정한다.(1(User) : N(Board))
  // ! 이 필드는 TypeORM 내부적으로 JOIN 쿼리 떄 사용된다.
}
// 이렇게 생성한 Entity는 해당 모듈의 모듈이름.modulte.ts의 @Module() 데코레이터의 imports에 TypeOrmModule.forFeature([Board])의 형태로 등록해야 해당 모듈의 Entity로 인식한다.
// TypeOrmModule은 @nestjs/typeorm에서 제공한다.
