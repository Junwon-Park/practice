import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AtuhCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
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
