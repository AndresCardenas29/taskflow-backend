import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
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

	async login(loginUserDto: LoginUserDto): Promise<response> {
		try {
			// find user by email
			const user = await this.userRepository.findOne({
				where: { email: loginUserDto.email },
			});

			if (!user) {
				return {
					message: "User not found",
					data: null,
					error: "User not found",
				};
			}

			// check password
			const isPasswordMatch = await bcrypt.compare(
				loginUserDto.password,
				user.password,
			);
			if (!isPasswordMatch) {
				return {
					message: "Password is incorrect",
					data: null,
					error: "Password is incorrect",
				};
			}

			return {
				message: "Login successful",
				data: {
					username: user.username,
					is_active: user.is_active,
					role: user.role,
					token: "",
				},
				error: "",
			};
		} catch (error) {
			return {
				message: "Login failed",
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

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
