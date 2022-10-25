import { LoginDto } from './../../dto/authUser.dto';
import { SignupDto } from '../../dto/authUser.dto';
import { User } from './user.model';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      userLoginId: 'abc123',
      userPassword: 'pw1234',
      userName: 'Mark',
      userAddress: 'Seoul',
      userCellPhoneNumber: '010-1234-5678',
      userEmail: 'abc123@gmail.com',
      userLastModifiedDate: null,
      userIsDeleted: false,
      userDeletedDate: null,
    },
  ];

  signup(signupDto: SignupDto): { isSucceeded: boolean; Message: string } {
    const {
      userLoginId,
      userPassword,
      userName,
      userAddress,
      userCellPhoneNumber,
      userEmail,
    } = signupDto;

    const isConflictUser: string[] = this.users.map((user) => {
      if (user.userLoginId === userLoginId) return userLoginId;
    });

    if (!isConflictUser[isConflictUser.length - 1]) {
      const user: User = {
        userId: this.users[this.users.length - 1].userId + 1,
        userLoginId,
        userPassword,
        userName,
        userAddress,
        userCellPhoneNumber,
        userEmail,
        userLastModifiedDate: null,
        userIsDeleted: false,
        userDeletedDate: null,
      };

      // Create account
      this.users.push(user);

      return { isSucceeded: true, Message: 'Signup is succeeded' };
    } else {
      // Conflict exception
      throw new ConflictException({
        isSucceeded: false,
        Message: 'Signup is failed',
      });
    }
  }

  login(loginDto: LoginDto): {
    userInfo: {
      userId: number;
      userLoginId: string;
      userName: string;
      userAddress: string;
      userEmail: string;
    };
    Authorization: {
      accessToken: string;
      refreshToken: string;
    };
    isSucceeded: Boolean;
    Message: string;
  } {
    const { userLoginId, userPassword } = loginDto;

    const certifiedUser: User[] = this.users.map((user) => {
      if (
        user.userLoginId === userLoginId &&
        user.userPassword === userPassword
      )
        return user;
    });

    if (certifiedUser[0]) {
      // 인증된 유저(Unique)가 있는 경우
      const { userId, userLoginId, userName, userAddress, userEmail } =
        certifiedUser[0];

      return {
        userInfo: {
          userId,
          userLoginId,
          userName,
          userAddress,
          userEmail,
        },
        Authorization: {
          accessToken: userLoginId + ',Access',
          refreshToken: userLoginId + ',Refresh',
        },
        isSucceeded: true,
        Message: 'Signin is succeeded',
      };
    } else {
      return {
        userInfo: null,
        Authorization: null,
        isSucceeded: false,
        Message: 'Signin is failed',
      };
    }
  }
}
