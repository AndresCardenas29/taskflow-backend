import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

export type JwtData = {
	sub: number;
	email: string;
	username: string;
	role: string;
	iat?: number; // timestamp en milisegundos
	exp?: number; // timestamp en milisegundos
};

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, pass: string): Promise<{ access_token: string }> {
		const user = await this.usersService.findOne(email, true);

		if (!user || !user.password) {
			throw new UnauthorizedException();
		}

		const isMatch = await bcrypt.compare(pass, user.password);
		if (!isMatch) {
			throw new UnauthorizedException();
		}

		const payload: JwtData = {
			sub: user.id,
			email: user.email,
			username: user.username,
			role: user.role,
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
