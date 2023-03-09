import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// * .env 파일은 전역에 적용되는 환경 변수를 정의하는 파일이기 때문에
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env`,
    }),
  ],
})
export default class EnvConfigModule {}
// export default로 내보내면 이 모듈에서 EnvConfigModule 이 한 가지만 내보낸다는 것이다.
// 그래서 어차피 이 파일에서 내보내는 것이 명확히 EnvConfigModule이기 때문에 import하는 곳에서 이름을 다르게 작성해서 사용할 수 있다.(경로만 이 파일이면 사용 가능)
// * import하는 곳에서 이름을 다르게 사용해야 하거나 여러 함수 또는 클래스 등이 존재하지만 그 중 대표하는 것 하나만 내보내는 경우 사용할 수 있다.
