import { AuthToken } from '../../common/utils/authToken.util';
import {
  LoginDto,
  CheckCertifiedDto,
  EditPasswordDto,
  EditMyInfoDto,
  DeleteMineDto,
} from './../../dto/authUser.dto';
import { SignupDto } from '../../dto/authUser.dto';
import { User } from './user.model';
import { ConflictException, Injectable } from '@nestjs/common';

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

  constructor(private authToken: AuthToken) {}

  /**회원가입 기능 */
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

  /**로그인 기능 */
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

  /**회원 인증 기능 */
  checkCertifiedUser(checkCertifiedDto: CheckCertifiedDto): {
    isSucceeded: boolean;
    Message: string;
  } {
    const { userLoginId, userPassword, Authorization } = checkCertifiedDto;

    const certifiedUser: User = this.users.filter((user) => {
      if (
        user.userLoginId === userLoginId &&
        user.userPassword === userPassword
      )
        return user;
    })[0];

    // userLoginId, userPassword 인증 성공 여부
    if (!certifiedUser)
      return { isSucceeded: false, Message: 'Authentication is failed' };
    else {
      // 토큰 복호화
      const decodedAccessToken = this.authToken.decodeAccessToken(
        Authorization.accessToken,
      );

      // 복호화된 토큰으로 유저 인증
      const accessTokenCertifiedUser = this.users.filter((user) => {
        return user.userLoginId === decodedAccessToken;
      })[0];

      // 토큰 인증 성공 여부
      if (!accessTokenCertifiedUser)
        return { isSucceeded: false, Message: 'Authentication is failed' };
      else {
        return { isSucceeded: true, Message: 'Authentication is succeeded' };
      }
    }
  }

  /**비밀번호 수정 기능 */
  editPassword(
    editPasswordDto: EditPasswordDto,
    authorization: { authKey: string; accessToken: string },
  ): {
    isSucceeded: boolean;
    Message: string;
  } {
    const { authKey, accessToken } = authorization;

    const decodedAccessToken: string =
      this.authToken.decodeAccessToken(accessToken);

    const decodedAuthKey: {
      userLoginId: string;
      userPassword: string;
    } = this.authToken.decodeAuthKey(authKey);

    const certifiedByKeys: User[] = this.users.filter((user) => {
      if (
        user.userLoginId === decodedAccessToken &&
        user.userLoginId === decodedAuthKey.userLoginId &&
        user.userPassword === decodedAuthKey.userPassword
      )
        return user;
    });

    if (certifiedByKeys.length === 0) {
      return {
        isSucceeded: false,
        Message: 'Modify account password is failed',
      };
    } else {
      const { userPassword } = editPasswordDto;

      this.users.forEach((user) => {
        if (user.userId === certifiedByKeys[0].userId)
          user.userPassword = userPassword;
      });

      return {
        isSucceeded: true,
        Message: 'Modify account password is succeeded',
      };
    }
  }

  editMyInfo(
    editMyInfoDto: EditMyInfoDto,
    authKey: string,
  ):
    | {
        userInfo: {
          userLoginId: string;
          userName: string;
          userAddress: string;
          userEmail: string;
        };
        isSucceeded: boolean;
        Message: string;
        userLastModifiedDate: Date;
      }
    | { isSucceeded: boolean; Message: string } {
    const decodedAuthKey: {
      userLoginId: string;
      userPassword: string;
    } = this.authToken.decodeAuthKey(authKey);

    const {
      userName,
      userAddress,
      userCellPhoneNumber,
      userEmail,
      Authorization,
    } = editMyInfoDto;

    const decodedAccessToken = this.authToken.decodeAccessToken(
      Authorization.accessToken,
    );

    const authenticatedUser = this.users.filter((user) => {
      return user.userLoginId === decodedAccessToken;
    })[0];

    if (!authenticatedUser) {
      return {
        isSucceeded: false,
        Message: 'Modify user information is failed',
      };
    } else {
      const { userLoginId, userPassword } = decodedAuthKey;

      if (
        !(
          authenticatedUser.userLoginId === userLoginId &&
          authenticatedUser.userPassword === userPassword
        )
      ) {
        return {
          isSucceeded: false,
          Message: 'Modify user information is failed',
        };
      } else {
        authenticatedUser.userName = userName;
        authenticatedUser.userAddress = userAddress;
        authenticatedUser.userCellPhoneNumber = userCellPhoneNumber;
        authenticatedUser.userEmail = userEmail;
        authenticatedUser.userLastModifiedDate = new Date();

        return {
          userInfo: {
            userLoginId: authenticatedUser.userLoginId,
            userName: authenticatedUser.userName,
            userAddress: authenticatedUser.userAddress,
            userEmail: authenticatedUser.userEmail,
          },
          isSucceeded: true,
          Message: 'Modify user infomation is succeeded',
          userLastModifiedDate: authenticatedUser.userLastModifiedDate,
        };
      }
    }
  }

  deleteMine(deleteMineDto: DeleteMineDto):
    | {
        isSucceeded: boolean;
        Message: string;
        userDeletedDate: Date;
      }
    | {
        isSucceeded: boolean;
        Message: string;
      } {
    return;
  }
}
