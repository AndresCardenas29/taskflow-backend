import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private configService: ConfigService,
	) {}

	@Get()
	getHello(): {
		createdBy: string;
		webSite: string;
		linkedIn: string;
		version: string;
		githubUrl: string;
	} {
		console.log(process.env.PORT);

		return this.appService.getHello();
	}
}
