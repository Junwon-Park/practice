import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable() // Controller level에 @UseInterceptors()로 인터셉터 등록
export class SuccessInterceptor implements NestInterceptor {
  // Interceptor는 NestInterceptor 인터페이스를 구현하여 생성한다.
  // NestInterceptor 인터페이스에는 intercept()라는 메서드가 존재하고 해당 메서드를 구현하여 해당 인터셉터의 기능을 완성한다.

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // 컨트롤러의 핸들러 실행 전..

    // 컨트롤러 핸들러 실행...

    // 아래는 컨크롤러 핸들러 실행 후...
    return next.handle().pipe(
      map((data) => ({
        // rxjs 라이브러리에서 제공하는 map() 사용
        // ! map()의 인자로 컨트롤러에서 반환한 결과 값(응답 객체)이 들어온다.
        // 해당 응답 객체의 속성으로 success라는 속성을 추가해는 작업을 해준 것이다.
        success: true,
        data,
      })),
    );
  }
}
