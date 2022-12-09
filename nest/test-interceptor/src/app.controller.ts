import { SuccessInterceptor } from './interceptors/Success.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(SuccessInterceptor)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
