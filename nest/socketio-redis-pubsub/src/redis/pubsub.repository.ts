import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PubSubRedis } from './pubsub.redis.provider';
import Redis from 'ioredis';
import { RedisRepository } from './repository';

@Injectable()
// 아래 OnModuleInit 인터페이스는 onModuleInit() 메서드를 사용하기 위해 구현한 것이다.
export class PubSubRedisRepository
  extends RedisRepository<any>
  implements OnModuleInit
{
  constructor(
    // 커스텀 프로바이더에서 생성한 레디스 인스턴스를 주입받은 것이다.
    @Inject(PubSubRedis)
    protected readonly redis: Redis,
  ) {
    // 여기에서 상속하고 있는 RedisRepository에 주입 받은 레디스 인스턴스를 넘겨준다.
    // 그러면 레디스 인스턴스를 넘겨받은 RedisRepository에서는 해당 레디스 서버를 사용하는 레포지토리가 된다.
    // 또 다른 클래스에서 RedisRepository를 상속받아 다른 host와 port를 사용하는 레디스를 주입받아 넘겨주면 각각 다른 레디스 서버의 RedisRepository로서 공통적으로 사용할 수 있게 된다.
    super(redis, process.env.REDIS_PUBSUB_PREFIX);
  }

  // NestJS 생명 주기 중 onModuleInit 때, 아래 로직이 수행된다.
  // 위에서 구현하고 있는 OnModuleInit 인터페이스의 onModuleInit() 메서드를 구현한 것이다.
  async onModuleInit(): Promise<void> {
    let notifyKeyspaceEvents: any = [];
    await this.redis.config('GET', 'notify-keyspace-events', (err, result) => {
      if (err) {
        console.log(`PubSubRedisRepository onModuleInit ${err}`);
      } else {
        notifyKeyspaceEvents = result;
      }
    });

    if (notifyKeyspaceEvents[2] !== 'sxE') {
      const setConfigRetult = (await this.redis.config(
        'SET',
        'notify-keyspace-events',
        'Exs',
      )) as string;
      if (setConfigRetult !== 'OK') {
        console.log('PubSubRedisRepository Set Config Error');
      }
    }
  }

  public async find(pattern: string, isAddKeyPrefix?: boolean) {
    if (isAddKeyPrefix) pattern = `${this.keyPrefix}${pattern}`;

    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      return await this.getMany(keys);
    } else {
      return [];
    }
  }

  public async getMany(keys: string[], isAddKeyPrefix?: boolean) {
    if (isAddKeyPrefix) {
      keys = keys.map((key) => {
        return this.keyPrefix + key;
      });
    }

    const values = await this.redis.mget(keys);
    if (values.length > 0) {
      try {
        const v = values.map((value) => {
          return value == null ? null : JSON.parse(value);
        });
        return v;
      } catch (e) {
        // Do nothing
      }
    }
    return [];
  }
}
