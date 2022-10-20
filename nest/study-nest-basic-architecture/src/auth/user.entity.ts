import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username']) // 이 Entity의 username 필드는 고유한 값이어야 한다.
// Unique 데코레이션에 필드를 등록하면 이 Entity로 요청이 들어왔을 때, 해당 필드의 값이 고유한 값이 해당 Entity의 DB 테이블에 존재하는지 체크한다.
// 만약 동일한 username으로 요청이 들어온다면 에러가 발생한다.
// 발생한 에러는 DB를 다루는 곳(Service 또는 Repository, 여기에서는 Repository pattern으로 구현하기 때문에 Repository)에서 예외처리 한다.
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
