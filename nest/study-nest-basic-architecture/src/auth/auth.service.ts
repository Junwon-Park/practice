import { Injectable } from '@nestjs/common';
import { AtuhCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(authCredentialDto: AtuhCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
