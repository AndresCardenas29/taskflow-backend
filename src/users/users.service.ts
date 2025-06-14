import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

type loginResponse = {
	username: string;
	token: string;
};

type response = {
	message: string;
	data: User | User[] | null | loginResponse;
	error: string;
};

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(createUserDto: CreateUserDto): Promise<response> {
		try {
			// check if password matches repeatPassword
			if (createUserDto.password !== createUserDto.repeatPassword) {
				return {
					message: "Passwords do not match",
					data: null,
					error: "Passwords do not match",
				};
			}
			// check if email already exists
			const existingUser = await this.userRepository.findOneBy({
				email: createUserDto.email,
			});
			if (existingUser) {
				return {
					message: "Email already exists",
					data: null,
					error: "Email already exists",
				};
			}

			// check if email already exists
			const existingUsername = await this.userRepository.findOneBy({
				username: createUserDto.username,
			});
			if (existingUsername) {
				return {
					message: "Username already exists",
					data: null,
					error: "Username already exists",
				};
			}

			// hash password
			const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

			createUserDto.password = hashedPassword;

			const newUser = this.userRepository.create(createUserDto);

			const response = await this.userRepository.save(newUser);

			// remove password from response
			response.password = "";
			return {
				message: "User created successfully",
				data: response,
				error: "",
			};
		} catch (error) {
			return {
				message: "User created successfully",
				data: null,
				error: error instanceof Error ? error.message : String(error),
			};
		}
	}

	async findAll(): Promise<response> {
		return {
			message: "Find all users",
			data: await this.userRepository.find(),
			error: "",
		};
	}

	async findOne(value: string | number): Promise<User | null> {
		// buscar por email o username
		const user = await this.userRepository.findOne({
			where: [{ email: value + "" }, { username: value + "" }],
		});
		return user;
	}

	async findOneById(id: number): Promise<User | null> {
		// buscar por id
		const user = await this.userRepository.findOneBy({ id });
		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		// find user by id
		const user = await this.findOneById(id);
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${id}`);
		}

		// validar si el email ya existe en otro usuario
		if (updateUserDto.email) {
			const existingUser = await this.userRepository.findOne({
				where: { email: updateUserDto.email },
			});
			if (existingUser && existingUser.id !== id) {
				throw new ConflictException(
					"El correo electrónico ya está registrado en otro usuario.",
				);
			}
		}

		// validar si el username ya existe en otro usuario
		if (updateUserDto.username) {
			const existingUser = await this.userRepository.findOne({
				where: { username: updateUserDto.username },
			});
			if (existingUser && existingUser.id !== id) {
				throw new ConflictException(
					"El nombre de usuario ya está registrado en otro usuario.",
				);
			}
		}

		try {
			const updatedUser = await this.userRepository.update(+id, updateUserDto);

			if (updatedUser.affected === 1) {
				return {
					message: "Usuario actualizado",
					data: "",
					error: "",
				};
			}
			throw new BadRequestException("No se pudo actualizar el recurso");
		} catch (error) {
			throw new BadRequestException(error);
		}
	}

	async remove(id: number) {
		// find user by id
		const user = await this.findOneById(id);
		if (!user)
			throw new NotFoundException(`No se encontró el recurso con id ${id}`);

		try {
			const updatedUser = await this.userRepository.delete(id);

			if (updatedUser.affected === 1) {
				return {
					message: "Usuario eliminado",
					data: "",
					error: "",
				};
			}
			throw new BadRequestException("No se pudo eliminar el recurso");
		} catch (error) {
			throw new BadRequestException(error);
		}
	}
}
