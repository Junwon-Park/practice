import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
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
}
// 이렇게 생성한 Entity는 해당 모듈의 모듈이름.modulte.ts의 @Module() 데코레이터의 imports에 TypeOrmModule.forFeature([Board])의 형태로 등록해야 해당 모듈의 Entity로 인식한다.
// TypeOrmModule은 @nestjs/typeorm에서 제공한다.
