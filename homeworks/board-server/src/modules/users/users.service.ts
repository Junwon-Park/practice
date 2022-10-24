import { AuthUserDto } from './../../dto/auth-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  signup(authUserDto: AuthUserDto): { Success: boolean } {
    return { Success: true };
  }
}
