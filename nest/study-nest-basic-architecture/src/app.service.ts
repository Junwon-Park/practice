import { Injectable } from '@nestjs/common';

@Injectable() // 프로젝트 전체의 컨트롤레에서 사용될 수 있도록 종속성 주입을 위한 데코레이터
export class AppService {
  getHello(): string {
    return 'Hello World!'; // 반환된 값은 다시 컨트롤러로 간다.
    // 브라우저에 찍히는 "Hello World!"가 이 것이다.
  }
}
