import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // NestJS에서 환경변수(.env 모듈)를 사용할 수 있도룩 지원해주는 라이브러리
import { MongooseModule } from '@nestjs/mongoose'; // NestJS에서 제공하는 몽구스 설치
import * as mongoose from 'mongoose'; // MongoDB의 ODM
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // 이 모듈을 imports에 등록해줘야 프로젝트에서 .env를 사용할 수 있다.(.env는 프로젝트 전역에서 사용할 것이기 때문에 AppModule에 imports 한다.)
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true, // mongodb url을 읽을 수 있도록 설정한다.
      useUnifiedTopology: true, // 최신 mongodb 드라이버 엔진을 사용하도록 설정한다. (안정적인 연결을 유지할 수 없는 경우를 제외하고 이 옵션을 true로 설정해야 한다.)
    }), // NestJS에서 몽구스를 사용해서 몽고DB를 사용하려면 몽구스 모듈의 forRoot() 메서드의 첫 번째 인자로 연결할 DB의 URI를 넣는다.
    // 두 번째 인자로는 몽고DB의 옵션을 설정한다.
    CatsModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 기본적으로 @Module() 데코레이터에는 미들웨어를 등록할 수 있는 부분이 없기 때문에 해당 모듈 클래스에 nestjs/common에서 제공하는 NestMdule 인터페이스를 구현하여 미들웨어를 모듈에 등록한다.

  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false; // 개발 단계에서 Mongoose 쿼리를 콘솔에 찍을 지 말 지에 대한 Boolean 타입의 변수 idDev
  // mongoose.set()의 두 번째 인자로 사용된다.

  configure(consumer: MiddlewareConsumer) {
    // NestModule의 configure() 메서드를 구현하고 인자로 MiddlewareConsumer 타입을 받는다.(MiddlewareConsumer에는 수행할 미들웨어를 등록할 apply() 메서드와 미들웨어를 수행할 Path를 지정하는 forRoute() 메서드를 제공한다.
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    // /cats로 들어온 요청에 대해서 LoggerMiddleware 미들웨어를 수행한다는 의미이다.
    // 모든 요청에 대해서 이 미들웨어를 수행하려면 forRoutes()의 인자로 '*'(와일드카드)를 사용할 수 있다.

    mongoose.set('debug', this.isDev);
    // 두 번째 인자의 값이 true이면 쿼리를 찍고 false이면 커리를 찍지 않는다.(개발 단계에서는 true를 줘서 날린 쿼리가 찍히도록 하고, 프로덕션 단계에서는 false로 하여 더 이상 찍히지 않도록 한다.)
  }
}
