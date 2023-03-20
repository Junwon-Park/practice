import { Module } from '@nestjs/common';
import { AniwhereModule } from 'aniwhere/aniwhere.module';
import { DefaultAniwhereJwtAuthModule } from 'aniwhere/common/auth/aniwhere.auth.module';
import EnvConfigModule from 'config/env.config.module';
import { LoggerModule } from 'global/loggers/logger.module';

@Module({
  imports: [
    EnvConfigModule,
    AniwhereModule,
    LoggerModule,
    DefaultAniwhereJwtAuthModule('30d'),
  ],
})
export class AppModule {}
