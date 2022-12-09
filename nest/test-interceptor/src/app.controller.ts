import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get()
  getHello(): void {
    console.log('Cotroller...');
    this.appService.getHello();
  }
}
