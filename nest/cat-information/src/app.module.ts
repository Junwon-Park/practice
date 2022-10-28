import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // NestJS에서 환경변수(.env 모듈)를 사용할 수 있도룩 지원해주는 라이브러리
import { MongooseModule } from '@nestjs/mongoose'; // NestJS에서 제공하는 몽구스 설치
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(), // 이 모듈을 imports에 등록해줘야 프로젝트에서 .env를 사용할 수 있다.
    CatsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true, // mongodb url을 읽을 수 있도록 설정한다.
      useUnifiedTopology: true, // 최신 mongodb 드라이버 엔진을 사용하도록 설정한다. (안정적인 연결을 유지할 수 없는 경우를 제외하고 이 옵션을 true로 설정해야 한다.)
    }), // NestJS에서 몽구스를 사용해서 몽고DB를 사용하려면 몽구스 모듈의 forRoot() 메서드의 첫 번째 인자로 연결할 DB의 URI를 넣는다.
    // 두 번째 인자로는 몽고DB의 옵션을 설정한다.
  ],
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
