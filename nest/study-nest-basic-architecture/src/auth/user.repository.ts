import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { AtuhCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
    // super를 사용하는 이유는 this에 데이터소스객체를 바로 할당해서 사용할 수 있게 하기 위함이다.
  }

  async createUser(authCredentialDto: AtuhCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const user = await this.create({ username, password });

    // Entity에 등록한 @Unique() 데코레이터 유효성 검사 예외처리 하는 곳(try / catch)
    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY')
        // 발생한 에러의 코드가 ER_DUP_ENTRY일 때. (에러 코드는 RDBMS마다 다르다.)
        throw new ConflictException('Existing username');
      // 409 Conflict 에러 예외처리
      else throw new InternalServerErrorException(); // 500 서버 에러 예외처리
    }
  }
}
