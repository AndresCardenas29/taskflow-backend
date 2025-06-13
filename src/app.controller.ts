import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): {
    createdBy: string,
    webSite: string,
    linkedIn: string,
    version: string
  } {
    return this.appService.getHello();
  }
}
