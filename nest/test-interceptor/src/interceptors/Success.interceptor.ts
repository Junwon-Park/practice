import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptors body...'); // 라우트 핸들러로 넘어가기 전, 인터셉터가 호출되면 우선 이 부분이 실행된다.

    // 아래 반환문이 실행되기 전, Controller -> Service -> Repository 실행 후,
    // 최종적으로 라우트 핸들러(Controller)에서 요청을 한 클라이언트에 응답을 하기 전 아래 반환문에 pipe() 메서드가 호출되었다면 메서드 내부 로직 실행 후 끝이나면 그 값을 최종 결과물로 응답한다.

    // 아래 부분은 RxJS의 문법이다.
    return next
      .handle() //
      .pipe(
        map((data): number => {
          return Number(data);
          // 앞서 Controller와 Service에서 데이터 타입은 string이었지만 인터셉터에서 타입을 변환해서 반환하는 것도 가능하다.
        }),
      );
  }
}
