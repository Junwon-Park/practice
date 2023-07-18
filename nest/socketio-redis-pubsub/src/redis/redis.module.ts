import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PubSubRedisProvider } from './pubsub.redis.provider';
import { ConnectionGateway } from './connection.gateway';
import { SubscribeGateway } from './subscribe-gateway';
import { PubSubRedisRepository } from './pubsub.repository';

@Module({
  providers: [
    PubSubRedisProvider,
    ConfigModule,
    ConnectionGateway,
    SubscribeGateway,
    PubSubRedisRepository,
  ],
  exports: [PubSubRedisProvider],
})
export class RedisModule {}
