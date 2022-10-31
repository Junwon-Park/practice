import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // HttpExeption 객체를 캐치하는 데코레이터
// @UseFilters() 데코레이터의 인자로 Filter를 등록해 사용할 수 있다.
// ! @UseFilters() 데코레이터가 붙은 함수에서 발생한 예외처리 객체가 해당 필터의 @Catch() 데코레이터에 등록된 예외처리 객체라면 그 것을 캐치한다.
// 또는 main.ts에 app.useGlobalFilters()의 인자로 해당 필터의 인스턴스(new HttpExceptionFilter)를 등록하여 Global level로 등록할 수도 있다.
export class HttpExceptionFilter implements ExceptionFilter {
  // -
  // ! ExceptionFilter는 필터로 등록된 위치에서 Exception이 발생하는 것을 캐치하여 클라이언트에게 보낼 에러 메세지를 구현할 수 있다.

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>(); // 해당 요청 객체를 가져올 수 있다.
    const status = exception.getStatus(); // 예외처리 에러가 발생한 함수의 예외처리 객체의 상태 코드를 가져올 수 있다.
    const errorMessage = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] }; // 예외처리 에러가 발생한 함수의 예외처리 객체에 지정한 메세지를 exception 객체의 getResponse() 메서드로 가져올 수 있다.(새로 추가한 변수)

    if (typeof errorMessage === 'string') {
      // errorMessage가 string인 경우는 직접 작성한 에러 예외처리의 경우이고, 그렇지 않은 경우는 직접 작성한 에러 예외처리가 아닌 NestJS에서 자체적으로 발생시킨 예외처리의 경우이다.
      // NestJS 자체에서 발생한 예외처리의 에러 메세지는 객체(Object)의 형태이다.
      // ! 용도에 맞게 커스텀 가능하다.
      response.status(status).json({
        // 최종 응답 형태이다.
        succeeded: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        errorMessage, // 새로 추가한 속성
      });
    } else {
      response.status(status).json({
        succeeded: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...errorMessage, // NestJS 자체에서 발생시킨 예외처리는 객체의 형태로 들어오기 때문에 직접 발생시킨 경우와 동일한 형태로 출력하도록 하기 위해서 구조분해 할당한 것이다.
      });
    }
  }
}
