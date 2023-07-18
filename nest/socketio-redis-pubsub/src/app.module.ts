import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    RedisModule,
    ConfigModule.forRoot({
      envFilePath: '../env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
