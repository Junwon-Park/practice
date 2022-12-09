import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/Logger.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // NestJS에서 미들웨어를 사용하려면 module에서 NestModule 인터페이스를 구현하면 된다.
  configure(consumer: MiddlewareConsumer) {
    // NestModule 인터페이스의 configure() 메서드를 구현하면 되는데, consumer의 apply() 메서드에 동작할 미들웨어를 등록해서 사용한다.
    consumer.apply(LoggerMiddleware).forRoutes('*'); // forRoutes()에 라우터를 지정해주면 해당 라우터의 엔드포인트로 요청이 왔을 때만 해당 미들웨어가 동작한다.
    // 특정 라우터를 지정할 수도 있지만 위처럼 와일드 카드(*)를 지정하면 모든 요청에 대해서 등록한 미들웨어가 동작한다.

    // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
    // ? 위 처럼 여러 미들웨어를 등록할 수도 있다.

    //   consumer
    // .apply(LoggerMiddleware)
    // .exclude(
    //   { path: 'cats', method: RequestMethod.GET },
    //   { path: 'cats', method: RequestMethod.POST },
    //   'cats/(.*)',
    // )
    // .forRoutes(CatsController);
    // ? 위와 같이 exclude() 메서드를 사용해서 특정 라우팅에 대해서는 제외시킬 수 있다.
  }
}
