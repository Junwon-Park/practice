// Nest의 Controller는 Express에서의 Router와 같다.

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // app.module.ts에서 넘어온 요청은 해당하는 컨트롤러로 찾아가게 된다.
  @Get() // Express의 Router에서 router.get('/', ...)이 Nest에서는 @Get('/') getHello() 형식이다.
  // @Get()은 데코레이터라고 한다.
  // 데코레이터의 역할은 함수 또는 클래스에 어떤 기능을 첨가해주는 것이다.
  // @Get() === @Get('/')
  getHello(): string {
    // getHello()라는 함수는 appService라는 서비스 객체(Class)의 getHello()라는 모듈 함수이다.
    // Controller에서 함수가 호출되면 해당 함수가 구현된 app.service.ts의 appService 객체의 getHello() 메서드가 실행된다.
    // 그리고 그 리턴 값을 여기에서 받는다.
    // 그리고 다시 그 리턴 값을 리턴하는데, 이 리턴 값은 app.module.ts로 간다.
    // app.module.ts에 들어간 값은 main.ts의 NestFactory라는 곳으로 들어가게 된다.
    // 그리고 요청을 보낸 클라이언트에게 해당 리턴 값을 응답하게 된다.(http://localhost:3000으로 Get 요청을 보내면 응답으로 "Hello world!"를 받게 된다.)
    // 즉, Client Request -> main.ts -> app.module.ts -> app.controller.ts -> app.service.ts -> app.controller.ts -> app.module.ts -> main.ts -> Response to Cient 순서로 동작한다.
    return this.appService.getHello();
  }
}
