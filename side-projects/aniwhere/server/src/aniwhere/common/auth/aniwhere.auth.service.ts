import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import RefreshTokenRepository from 'aniwhere/infrastructure/mongodb/repository/refreshToken.repository';

@Injectable()
export default class AniwhereAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshToken: RefreshTokenRepository,
  ) {}

  getAccessTokenExpiresIn(keep: boolean): number {
    return Number(this.configService.get('AUTH_TOKEN_JWT_EXPIRATION_TIME'));
  }

  getRefreshTokenExpiresIn(): number {
    return Number(
      this.configService.get('AUTH_REFRESH_TOKEN_JWT_EXPIRATION_TIME'),
    );
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }

  //   async generateToken(
  //     fields: ILoginAdminUserFields,
  //     tokenType: 'AUTH_TOKEN_JWT_SECRET' | 'AUTH_REFRESH_TOKEN_JWT_SECRET',
  //   ) {
  //     const secret = this.configService.get<string>(tokenType);
  //     const now = new Date();
  //     const signature = {
  //       userId: fields.userId,
  //       loginId: fields.loginId,
  //     };
  //     const expiresIn =
  //       tokenType === 'AUTH_TOKEN_JWT_SECRET'
  //         ? this.getAccessTokenExpiresIn(fields.keep)
  //         : this.getRefreshTokenExpiresIn();

  //     const token = this.jwtService.sign(
  //       {
  //         signature: signature,
  //         generatedAt: now,
  //       },
  //       {
  //         expiresIn: expiresIn,
  //         secret: secret,
  //       },
  //     );

  //     if (tokenType === 'AUTH_REFRESH_TOKEN_JWT_SECRET') {
  //       await this.createRefreshToken({
  //         userId: fields.userId,
  //         token: token,
  //       });
  //     }
  //     return token;
  //   }

  //   async createRefreshToken(
  //     fields: ICreateRefreshTokenFields,
  //   ): Promise<PostboxAdminRefreshToken> {
  //     const refreshTokenExpiresIn = new Date(
  //       Date.now() + this.getRefreshTokenExpiresIn() * 1000,
  //     );
  //     const refreshToken = await this.adminRefreshTokenService.create({
  //       userId: fields.userId,
  //       token: fields.token,
  //       expiresIn: refreshTokenExpiresIn,
  //       createdAt: new Date(),
  //     });

  //     return refreshToken;
  //   }
}
