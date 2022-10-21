import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository, DataSource } from 'typeorm';
import { AtuhCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  // User entity 타입의 Repository 객체 상속
  constructor(private dataSource: DataSource, private jwtService: JwtService) {
    super(User, dataSource.createEntityManager());
    // super를 사용하는 이유는 this에 데이터소스객체를 바로 할당해서 사용할 수 있게 하기 위함이다.
  }

  async createUser(authCredentialDto: AtuhCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hashedPassword });

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

  async signIn(
    authCredentialDto: AtuhCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // user가 DB에 존재하고 bcrypt 인증이 true라면 로그인 성공
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else throw new UnauthorizedException('Login is Failed'); // 401 Unauthorized + 메세지 반환
  }
}
