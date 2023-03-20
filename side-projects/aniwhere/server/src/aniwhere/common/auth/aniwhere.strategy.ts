import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserRepository from 'aniwhere/infrastructure/mongodb/repository/users.repository';

@Injectable()
export class AniwhereStrategy extends PassportStrategy(Strategy, 'aniwhere') {
  constructor(
    private readonly configService: ConfigService,
    private readonly aniwhereUserRepository: UserRepository,
  ) {
    const secret = configService.get<string>('AUTH_TOKEN_JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer token
      secretOrKey: secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const aniwhereUser = await this.aniwhereUserRepository.findUserByLoginId(
      payload.loginId,
    );
    if (aniwhereUser == null) throw new UnauthorizedException();

    payload.id = aniwhereUser._id;
    payload.name = aniwhereUser.name;
    payload.nickName = aniwhereUser.nickName;
    payload.phone = aniwhereUser.phone;
    payload.address = aniwhereUser.address;

    return payload;
  }
}
