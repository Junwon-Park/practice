import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AtuhCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
// 이 데코레이터가 붙어 있는 모듈은 providers에 등록해야 사용 가능하며, 외부 모듈에서 사용하려면 exports에 등록하여 외부 모듈에서 imports 해서 사용할 수 있다.
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialDto: AtuhCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  signIn(
    authCredentialDto: AtuhCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.userRepository.signIn(authCredentialDto);
  }
}
