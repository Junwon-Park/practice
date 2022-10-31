import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable() // Controller에 의존성 주입하여 Controller level에 @UseInterceptors()로 인터셉터 등록
export class SuccessInterceptor implements NestInterceptor {
  // Interceptor는 NestInterceptor 인터페이스를 구현하여 생성한다.
  // NestInterceptor 인터페이스에는 intercept()라는 메서드가 존재하고 해당 메서드를 구현하여 해당 인터셉터의 기능을 완성한다.

  // ! 인터셉터는 요청이 컨트롤러의 핸들러로 들어가기 전 가로채 해당 요청에 대한 모듈의 로직을 모두 수행 후 다시 컨트롤러의 핸들러로 돌아왔을 때 클라이언트에게 보낼 응답의 최종 형태를 구현할 수 있다.

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // 컨트롤러의 핸들러 실행 전..

    // 컨트롤러 핸들러 실행 중... (여기에서 서비스와 레포지토리 등의 로직(서비스와 레포지토리 등이 있다면)을 수행 한다.)

    // 아래는 컨크롤러 핸들러 실행 후... (여기에서 서비스와 레포지토리 등의 로직(서비스와 레포지토리 등이 있다면)을 모두 수항한 후 컨트롤러(핸들러)로 결과가 돌야왔을 때 수행한다.)
    return next.handle().pipe(
      map((data) => ({
        // rxjs 라이브러리에서 제공하는 map() 사용
        // ! map()의 인자로 컨트롤러에서 반환한 결과 값(응답 객체)이 들어온다.
        // 해당 응답 객체에 success라는 속성(필드)을 추가하는 작업을 해준 것이다.
        success: true,
        data,
      })),
    );
  }
}
