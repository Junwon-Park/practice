import { AuthUserDto } from './../../dto/auth-user.dto';
import { UsersService } from './users.service';
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  signup(authUserDto: AuthUserDto): { Success: boolean } {
    console.log('Signup');
    return this.usersService.signup(authUserDto);
  }
}
