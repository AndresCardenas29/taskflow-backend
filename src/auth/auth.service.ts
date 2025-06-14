import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, pass: string): Promise<{ access_token: string }> {
		const user = await this.usersService.findOne(email);

		if (!user || !user.password) {
			throw new UnauthorizedException();
		}

		console.log({ pass });
		console.log({ "user.password": user.password });

		const isMatch = await bcrypt.compare(pass, user.password);
		if (!isMatch) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, username: user.username };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
