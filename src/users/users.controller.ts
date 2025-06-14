import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	UnauthorizedException,
	NotFoundException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtData } from "src/auth/auth.service";

// tipado del header de la respuesta
interface ResponseHeader {
	user?: JwtData;
}

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@UseGuards(AuthGuard)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@UseGuards(AuthGuard)
	@Get("/me")
	async me(@Request() req: ResponseHeader) {
		if (!req.user) throw new UnauthorizedException();
		const user = await this.usersService.findOne(req.user.email);

		if (!user) throw new NotFoundException("User not found");
		user.password = ""; // Remove password from response
		return user;
	}

	@UseGuards(AuthGuard)
	@Get(":email")
	async findOne(@Param("email") email: string, @Request() req: ResponseHeader) {
		if (!req.user) throw new UnauthorizedException();
		if (req.user?.role !== "admin") throw new UnauthorizedException();
		const user = await this.usersService.findOne(email);
		if (!user) throw new NotFoundException("User not found");
		user.password = ""; // Remove password from response
		return user;
	}

	@UseGuards(AuthGuard)
	@Patch(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
		@Request() req: ResponseHeader,
	) {
		if (req.user?.role === "admin") {
			await this.usersService.update(+id, updateUserDto);
			return {
				message: "Usuario actualizado",
				data: "",
				error: "",
			};
		}
		// find user by id
		const user = await this.usersService.findOneById(+id);

		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${id}`);
		}

		if (req.user?.email !== user.email) {
			throw new UnauthorizedException(
				"Unauthorized to update other user's profile",
			);
		}

		await this.usersService.update(+id, updateUserDto);
		return {
			message: "Usuario actualizado",
			data: "",
			error: "",
		};
	}

	@UseGuards(AuthGuard)
	@Delete(":id")
	async remove(@Param("id") id: string, @Request() req: ResponseHeader) {
		if (req.user?.role === "admin") {
			await this.usersService.remove(+id);
			return {
				message: "Usuario eliminado",
				data: "",
				error: "",
			};
		}
		// find user by id
		const user = await this.usersService.findOneById(+id);
		if (req.user?.role === "admin") {
			await this.usersService.remove(+id);
			return {
				message: "Usuario eliminado",
				data: "",
				error: "",
			};
		}

		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${id}`);
		}

		if (req.user?.email !== user.email) {
			throw new UnauthorizedException(
				"Unauthorized to update other user's profile",
			);
		}

		await this.usersService.remove(+id);
		return {
			message: "Usuario eliminado",
			data: "",
			error: "",
		};
	}
}
