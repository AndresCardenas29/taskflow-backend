import { Injectable } from "@nestjs/common";
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

	async findOne(email: string): Promise<User | null> {
		const user = await this.userRepository.findOneBy({ email });
		return user;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return {
			id,
			updateUserDto,
		};
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
