import { UsersModule } from 'aniwhere/domain/modules/users.module';
import { Module } from '@nestjs/common';
import { MongodbModels } from 'aniwhere/infrastructure/mongodb/mongodb.module';
import AniwhereAuthService from 'aniwhere/common/auth/aniwhere.auth.service';
import RefreshTokenRepository from 'aniwhere/infrastructure/mongodb/repository/refreshToken.repository';
import { JwtService } from '@nestjs/jwt';
import { DefaultAniwhereJwtAuthModule } from 'aniwhere/common/auth/aniwhere.auth.module';
import { AniwhereStrategy } from 'aniwhere/common/auth/aniwhere.strategy';

@Module({
  imports: [
    ...MongodbModels,
    UsersModule, // * AniwhereStrategy에서 UserRepository 의존성 주입
    DefaultAniwhereJwtAuthModule('30d'), // * JwtModule.register()를 import하는 모듈
  ],
  providers: [
    // Service
    AniwhereAuthService,

    // Repository
    RefreshTokenRepository,

    // ETC
    AniwhereStrategy,
    JwtService,
  ],
  exports: [AniwhereAuthService, RefreshTokenRepository],
})
export class AuthModule {}
