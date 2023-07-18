import Redis from 'ioredis';

// Symbolic 변수를 선언하고 Symbol()을 참조 할당한다. Symbol()의 인자로 들어가는 것은 해당 Symbol의 설명이다.
export const PubSubRedis = Symbol('PubSubRedisSymbol');

// 아래는 실제 프로바이더로 사용될 커스텀 프로바이더이다.
export const PubSubRedisProvider = {
  provide: PubSubRedis,
  // 커스텀 프로바이더는 주입할 클래스 생성자의 인자에 @Inject()를 사용해서 주입한다. 인자로 들어갈 이름이 아래 provider 키에 지정한 값이다.
  // 아래 useFactory는 해당 프로바이더가 실제 동작할 함수이다.
  useFactory: async () => {
    console.log(
      new Date(),
      'PubSubRedisProvider: Init - ' + '127.0.0.1' + ':' + 63709,
    );
    // 아래 host와 port를 사용하는 Redis 인스턴스를 생성해서 반환하는 동작을 한다.
    // 여기에서 생성하는 Redis 인스턴스의 host와 port를 각각 다르게 해서 여러 개 띄우는 것이 가능하다.
    // 그래서 이렇게 커스텀 프로바이더를 만들어서 각각의 host와 port를 부여한 레디스 인스턴스를 반환하는 방식으로 구현한 것이다.
    const client = new Redis({
      host: 'localhost',
      port: 63709,
    });
    // 위에서 생성한 레디스 인스턴스 반환
    return client;
  },
};
