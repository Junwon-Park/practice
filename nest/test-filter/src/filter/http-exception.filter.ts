import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // host 인자의 타입인 ArgumentsHost 인터페이스의 switchToHttp() 메서드로 HTTP Excecution context로 변환할 수 있다.
    // HTTP Excecution context로 변환 후에는 HTTP Request와 Response에 접근할 수 있다.
    // ArgumentsHost는 Interceptor의 intercept() 메서드의 두 번쨰 인자인 next
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      // ExpressJS의 res.status().json();
      // JSON 응답 객체 커스텀 가능
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
