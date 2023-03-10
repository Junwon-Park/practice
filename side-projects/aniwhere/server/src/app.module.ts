import { Module } from '@nestjs/common';
import { AniwhereModule } from 'aniwhere/aniwhere.module';
import { DefaultAniwhereJwtAuthModule } from 'aniwhere/common/auth/aniwhere.auth.module';
import EnvConfigModule from 'config/env.config.module';

@Module({
  imports: [
    EnvConfigModule,
    AniwhereModule,
    DefaultAniwhereJwtAuthModule('30d'),
  ],
})
export class AppModule {}
