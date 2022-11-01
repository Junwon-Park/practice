import { LoginRequestDto } from './dto/login.request.dto';
import { CatsRepository } from './../cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly jwtService: JwtService,
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
