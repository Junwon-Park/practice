import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; // NestJS 미들웨어의 req, res, next 모두 ExpressJS의 그 것이다.

@Injectable() // 미들웨어도 의존성 주입을 통해 사용해야 하기 때문에 @Injectable() 데코레이터를 붙힌다.
export class LoggerMiddleware implements NestMiddleware {
  // 미들웨어를 구현할 떄에는 NestMiddleware 인터페이스를 구현한다.
  // 이 미들웨어를 module에 등록할 때에 구현하는 NestMiddleware와 동일한 인터페이스이다.

  private logger = new Logger('NEST LOG'); // NestJS에서 제공하는 Logger 객체

  use(req: Request, res: Response, next: NextFunction) {
    // NestMiddleware 인터페이스의 use() 메서드는 ExpressJS의 app.use() 메서드와 동일하다.
    // 그리고 인자로 받는 req, res, next도 모두 동일한 그 것이다.

    this.logger.log(
      `${req.ip} ${req.method} ${req.statusCode}`,
      req.originalUrl,
    ); // log() 메서드에서 인자를 , 로 구분하면 줄바꿈을 의미한다.

    next(); // ExpressJS의 미들웨어와 동일하게 next() 메서드를 호출해야 다음 프로세스로 넘어갈 수 있다.
  }
}
