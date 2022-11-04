import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService, // ! auth.module.ts의 @module() 데코레이터의 imports에 등록한 JwtModule에서 제공하고 있기 때문에 의존성 주입이 가능하게 된다.
  ) {}

  async jwtLogIn(loginData: LoginRequestDto): Promise<{ token: string }> {
    const { email, password } = loginData;

    const cat = await this.catsRepository.findCatByEmail(email);
    const isPasswordValidated: boolean = password === cat.password;

    if (!cat || !isPasswordValidated)
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요');

    const payload = { email, sub: cat.id };

    return { token: this.jwtService.sign(payload) };
  }
}
