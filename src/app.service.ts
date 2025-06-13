import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {
    createdBy: string,
    webSite: string,
    linkedIn: string,
    version: string
  } {
    return {
      createdBy: "Andres Cardenas",
      webSite: "https://nekdress.online/",
      linkedIn: "https://www.linkedin.com/in/mandrescardenash/",
      version: "1.0.0"
    };
  }
}
