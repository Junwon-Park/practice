import { Module } from '@nestjs/common';
import { AniwhereModule } from 'aniwhere/aniwhere.module';
import EnvConfigModule from 'config/env.config.module';

@Module({
  imports: [EnvConfigModule, AniwhereModule],
})
export class AppModule {}
