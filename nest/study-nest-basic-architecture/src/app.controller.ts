import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // http 메서드 데코레이터의 ()에 아무 것도 작성하지 않으면(비어 있으면) 암묵적으로 '/'(root)를 의미한다.
  // Get 메서드의 / 경로로 들어온 요청은 아래 메서드를 실행한다.
  getHello(): string {
    return this.appService.getHello(); // app.service.ts의 appService.getHello() 메서드 호출하여 반환된 값을 반환한다.
    // 반환된 값은 요청을 보낸 클라이언트에 응답을 반환한다.
  }
}
