// import { PostboxAdminRefreshTokenService } from './admin-refresh-token.service';
// import { Injectable } from '@nestjs/common';
// import {
//   ICreateRefreshTokenFields,
//   ILoginAdminUserFields,
//   ILoginUserFields,
// } from '@/postbox-admin/common/auth/types';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class PostboxAdminAuthService {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly jwtService: JwtService,
//     private readonly adminRefreshTokenService: PostboxAdminRefreshTokenService,
//   ) {}

//   getAccessTokenExpiresIn(keep: boolean): number {
//     return Number(this.configService.get('AUTH_TOKEN_JWT_EXPIRATION_TIME'));
//   }

//   getRefreshTokenExpiresIn(): number {
//     return Number(
//       this.configService.get('AUTH_REFRESH_TOKEN_JWT_EXPIRATION_TIME'),
//     );
//   }

//   decodeToken(token: string): any {
//     return this.jwtService.decode(token);
//   }

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

//   async generateAllTokens(fields: ILoginUserFields) {
//     const now = new Date();
//     const signature = {
//       keep: fields.keep,
//     };

//     const accessSecret = this.configService.get<string>(
//       'AUTH_TOKEN_JWT_SECRET',
//     );
//     const accessToken = this.jwtService.sign(
//       {
//         signature: signature,
//         generatedAt: now,
//       },
//       {
//         secret: accessSecret,
//         expiresIn: this.getAccessTokenExpiresIn(fields.keep),
//       },
//     );

//     return {
//       accessToken,
//     };
//   }
// }
