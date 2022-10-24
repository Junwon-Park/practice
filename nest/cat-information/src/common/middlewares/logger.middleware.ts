import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express'; // 기본적으로 파라미터의 타입을 Express의 것을 사용한다.

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // NestJS에서 제공하는 NestMiddleware 인터페이스를 구현하여 미들웨어를 생성할 수 있다.
  // 네스트에서의 미들웨어는 Express에서의 미들웨어와 동일하다.

  // console.log()가 아닌 NestJS에서 제공하는 Logger 인스턴스 사용
  private reqLogger = new Logger('HTTP request log'); // 요청에 대한 로그 인스턴스
  private resLogger = new Logger('HTTP response log'); // 응답에 대한 로그 인스턴스

  // use(req: any, res: any, next: () => void) {
  use(req: Request, res: Response, next: NextFunction) {
    // use() 메서드는 Express의 app.use()와 동일하게 동작한다.
    // app.use(req, res, next) {
    //  ...
    // next();
    // }

    this.reqLogger.log(`${req.ip}, ${req.originalUrl}`, req.originalUrl); // ,(Comma)로 인자를 구분하면 , 를 기준으로 각각 개행되어 로그가 기록된다.

    res.on('finish', () => {
      // 이 요청에 대한 응답을 확인하고 싶을 때, res.on()으로 finish 이벤트를 감지하여 응답 이후의 로직을 작성할 수 있다.
      // 여기에서는 응답이 완료된 후, 해당 응답에 대한 로그를 기록하도록 했다.
      this.resLogger.log(`${req.ip}, ${req.originalUrl}`, res.statusCode); // ,(Comma)로 인자를 구분하면 , 를 기준으로 각각 개행되어 로그가 기록된다.
    });

    next(); // 미들웨어 수행 후 다음 작업으로 넘기는 메서드(Express와 동일하다.)
  }
}
