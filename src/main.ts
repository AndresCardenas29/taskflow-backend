import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.useGlobalPipes(new ValidationPipe());

	app.enableCors({
		origin: "*",
	});

	await app.listen(configService.get("PORT") ?? 4000);
}
void bootstrap();
