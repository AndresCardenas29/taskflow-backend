import {
	IsString,
	IsNotEmpty,
	IsEmail,
	IsOptional,
	Matches,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsString()
	@IsOptional()
	@Matches(/^[a-zA-Z0-9]+$/, {
		// letras sin espacios y numeros
		message:
			"El nombre solo puede contener letras sin espacios ni caracteres especiales",
	})
	username?: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	repeatPassword: string;
}
