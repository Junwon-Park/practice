import { Injectable } from '@nestjs/common';
import { Nullable, Optional } from 'src/types/natives';
import Redis from 'ioredis';

// const TAG = "RedisRepository"

// 실제 레디스에 접근하는 레포지토리
@Injectable()
export class RedisRepository<T> {
  protected readonly redis: Redis;
  protected readonly keyPrefix: string;
  protected subscribeRedis: Nullable<Redis>;

  // 생성자에 Redis를 받아서 레디스를 사용한다.
  // 이 클래스를 상속받는 자식 클래스에서 레디스를 주입해준다.
  // ! 여기에 직접 레디스 커스텀 프로바이더를 주입 받아도 된다.
  // 하지만 이 레포지토리를 다른 여러 클래스에서 상속 받는 경우,
  // 이 레포지토리를 공통적으로 사용하고 각각 다른 레디스 인스턴스를 생성자로 받아 공통적으로 사용할 수 있도록 하기 위해 이렇게 구현했다.
  constructor(redis: Redis, keyPrefix?: string) {
    this.redis = redis;
    this.subscribeRedis = null;
    this.keyPrefix = keyPrefix || '';
  }

  /**
   * Redis의 지정한 채널(channel)을 구독하고, addListener 함수를 통해 Listener를 추가함.
   * Redis의 이벤트(키 생성, 삭제, 등록, 만료 등)를 사용하려면 notify-keyspace-events config이 필요함.
   * ```js
   * this.redisRepository.subscribe('__keyevent@0__:expired', (channel, message) => {
   *   if (channel === '__keyevent@0__:expired') console.log(new Date(), `Received ${message} from ${channel}`);
   * });
   * ```
   */
  public async subscribe(
    channel: string,
    listener: (channel: string, message: string) => void,
  ): Promise<void> {
    if (this.subscribeRedis == null) {
      this.subscribeRedis = this.redis.duplicate();
    }

    await this.subscribeRedis.subscribe(channel);
    this.subscribeRedis.addListener('message', listener);
  }

  public async unsubscribe(channel: string): Promise<void> {
    if (this.subscribeRedis != null) {
      await this.subscribeRedis.unsubscribe(channel);
    }
  }

  async set(key: string, value: T, seconds?: number): Promise<void> {
    if (seconds == null) {
      await this.redis.set(this.keyPrefix + key, JSON.stringify(value));
    } else {
      await this.redis.set(
        this.keyPrefix + key,
        JSON.stringify(value),
        'EX',
        seconds,
      );
    }
  }

  async get(key: string): Promise<Optional<T>> {
    const value = await this.redis.get(this.keyPrefix + key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (e) {
        // Do nothing
      }
    }
    return null;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(this.keyPrefix + key);
  }

  async setArray(key: string, array: T[]): Promise<void> {
    await this.redis.set(this.keyPrefix + key, JSON.stringify(array));
  }

  async getArray(key: string): Promise<T[]> {
    const value = await this.redis.get(this.keyPrefix + key);
    if (value) {
      try {
        const array = JSON.parse(value);
        return Array.isArray(array) ? array : [array];
      } catch (e) {
        // Do nothing
      }
    }
    return [];
  }

  async pushToArray(key: string, value: T): Promise<void> {
    const array = await this.getArray(key);
    array.push(value);
    await this.setArray(key, array);
  }

  async pullFromArray(
    key: string,
    value: T,
    equals?: (a: T, b: T) => boolean,
  ): Promise<void> {
    let array = await this.getArray(key);
    if (equals) {
      array = array.filter((item: T) => equals(item, value));
    } else {
      array = array.filter((item: T) => String(item) != String(value));
    }
    await this.setArray(key, array);
  }

  async getSet(key: string): Promise<Set<T>> {
    return new Set(await this.getArray(key));
  }

  async addToSet(key: string, value: T): Promise<void> {
    const set = await this.getSet(key);
    set.add(value);
    await this.setArray(key, Array.from(set));
  }

  async removeFromSet(
    key: string,
    value: T,
    equals?: (a: T, b: T) => boolean,
  ): Promise<void> {
    await this.pullFromArray(key, value, equals);
  }

  async keys(pattern?: string): Promise<string[]> {
    return await this.redis.keys(pattern || '*');
  }

  async clear(): Promise<void> {
    await this.redis.flushall();
  }
}
