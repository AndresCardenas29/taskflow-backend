import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class LoginUserDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsOptional()
	username?: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}
