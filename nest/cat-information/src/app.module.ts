import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 기본적으로 @Module() 데코레이터에는 미들웨어를 등록할 수 있는 부분이 없기 때문에 해당 모듈 클래스에 NestMdule을 구현하여 미들웨어를 모듈에 등록한다.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats'); // /cats로 들어온 요청에 대해서 LoggerMiddleware 미들웨어를 수행한다는 의미이다.
    // 모든 요청에 대해서 이 미들웨어를 수행하려면 forRoutes()의 인자로 '*'(와일드카드)를 사용할 수 있다.
  }
}
