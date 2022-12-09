import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // 라우트 핸들러로 넘어가기 전, 인터셉터가 호출되면 우선 이 부분이 실행된다.

    // 아래 반환문이 실행되기 전, Controller -> Service -> Repository 실행 후,
    // 최종적으로 라우트 핸들러(Controller)에서 요청을 한 클라이언트에 응답을 하기 전 아래 반환문에 pipe() 메서드가 호출되었다면 메서드 내부 로직 실행 후 끝이나면 그 값을 최종 결과물로 응답한다.

    return next
      .handle() // next(CallHandler)의 handle() 메서드는 라우트 핸들러(Controller or Resolver(GraphQL))로 프로세스를 넘겨주는 기능을 한다.
      .pipe(tap(() => console.log('After...'))); // pipe() 메서드는 다시 라우트 핸들러로 부터 돌려받은 프로세스의 데이터를 클라이언트에 응답하기 전 로직을 수행하는 기능을 한다.
  }
}

// * Output
// Before...
// Cotroller...
// Service...
// After...
