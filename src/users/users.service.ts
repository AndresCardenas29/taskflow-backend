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
import { Task } from "src/tasks/entities/task.entity";
import { Project } from "src/projects/entities/project.entity";

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
		@InjectRepository(User)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(User)
		private readonly projectRepository: Repository<Project>,
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
		const users = await this.userRepository.find();
		return {
			message: "Find all users",
			data: users,
			error: "",
		};
	}

	async findOne(
		value: string | number,
		showPassword: boolean = false,
	): Promise<User | null> {
		// personalizar la consulta para
		// buscar por email o username
		const user = await this.userRepository.findOne({
			where: [{ email: value + "" }, { username: value + "" }],
			select: showPassword ? ["id", "username", "email", "password"] : [],
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

	async getTasks(id: number): Promise<Task[] | null> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ["tasks"],
		});
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${id}`);
		}
		return user.tasks;
	}

	async addTaskToUser(userId: number, taskId: number) {
		// find user by id
		const user = await this.findOneById(userId);
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${userId}`);
		}
		// find task by id
		const task = await this.taskRepository.findOne({
			where: { id: taskId },
		});
		if (!task) {
			throw new NotFoundException(`No se encontró el recurso con id ${taskId}`);
		}

		if (!user.tasks) {
			user.tasks = [];
		}

		const isAlreadyAssigned = user.tasks.some((t) => t.id === taskId);
		if (isAlreadyAssigned) {
			throw new BadRequestException(`El usuario ya tiene el tarea asignada`);
		}
		user.tasks.push(task);
		return await this.userRepository.save(user);
	}

	async removeTaskFromUser(userId: number, taskId: number) {
		// find user by id
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations: ["tasks"],
		});
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${userId}`);
		}
		// find task by id
		const task = await this.taskRepository.findOne({
			where: { id: taskId },
		});
		if (!task) {
			throw new NotFoundException(`No se encontró el recurso con id ${taskId}`);
		}
		user.tasks = user.tasks.filter((t) => t.id !== taskId);
		return await this.userRepository.save(user);
	}

	// Projects

	async getProjects(id: number): Promise<Project[] | null> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ["projects", "projects.assigned_users"],
		});
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${id}`);
		}
		return user.projects;
	}

	async addProjectToUser(userId: number, projectId: number) {
		// find user by id
		const user = await this.findOneById(userId);
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${userId}`);
		}
		// find project by id
		const project = await this.projectRepository.findOne({
			where: { id: projectId },
		});
		if (!project) {
			throw new NotFoundException(
				`No se encontró el recurso con id ${projectId}`,
			);
		}

		if (!user.projects) {
			user.projects = [];
		}

		const isAlreadyAssigned = user.projects.some((p) => p.id === projectId);
		if (isAlreadyAssigned) {
			throw new BadRequestException(`El usuario ya tiene el proyecto asignado`);
		}
		user.projects.push(project);
		return await this.userRepository.save(user);
	}

	async removeProjectFromUser(userId: number, projectId: number) {
		// find user by id
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations: ["projects"],
		});
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${userId}`);
		}
		// find project by id
		const project = await this.projectRepository.findOne({
			where: { id: projectId },
		});
		if (!project) {
			throw new NotFoundException(
				`No se encontró el recurso con id ${projectId}`,
			);
		}
		user.projects = user.projects.filter((p) => p.id !== projectId);
		return await this.userRepository.save(user);
	}
}
