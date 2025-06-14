import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	id?: number;
	email?: string;
	username?: string;
	password?: string;
	is_active?: boolean;
	status?: string;
	role?: string;
}
