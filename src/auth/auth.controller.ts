import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	signIn(@Body() singnInDto: Record<string, string>) {
		return this.authService.signIn(singnInDto.email, singnInDto.pass);
	}

	/* @UseGuards(AuthGuard)
	@Get("profile")
	getProfile(@Request() req) {
		return req.user;
	} */
}
