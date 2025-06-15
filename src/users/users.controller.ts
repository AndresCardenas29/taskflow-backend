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
import { Task } from "src/tasks/entities/task.entity";
import { Project } from "src/projects/entities/project.entity";

// tipado del header de la respuesta
interface ResponseHeader {
	user?: JwtData;
}

type responseTask = {
	message: string;
	data: Task | Task[] | null;
	error: string;
};

type responseProject = {
	message: string;
	data: Project | Project[] | null;
	error: string;
};

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

	// obtener tareas asignadas al usuario
	@UseGuards(AuthGuard)
	@Get("tasks")
	async getTasks(@Request() req: ResponseHeader): Promise<responseTask> {
		if (!req.user) {
			throw new UnauthorizedException("Unauthorized to access this resource");
		}

		const task = await this.usersService.getTasks(req.user?.sub);
		if (!task) {
			throw new NotFoundException(
				`No se encontró el recurso con id ${req.user?.sub}`,
			);
		}
		return {
			message: "Tareas asignadas al usuario",
			data: task,
			error: "",
		};
	}

	// obtener tareas asignadas al usuario
	@UseGuards(AuthGuard)
	@Get("projects")
	async getProjects(@Request() req: ResponseHeader): Promise<responseProject> {
		if (!req.user) {
			throw new UnauthorizedException("Unauthorized to access this resource");
		}

		const project = await this.usersService.getProjects(req.user?.sub);
		if (!project) {
			throw new NotFoundException(
				`No se encontró el recurso con id ${req.user?.sub}`,
			);
		}
		return {
			message: "Proyectos asignados al usuario",
			data: project,
			error: "",
		};
	}

	@UseGuards(AuthGuard)
	@Get(":email")
	async findOne(@Param("email") email: string, @Request() req: ResponseHeader) {
		if (!req.user) throw new UnauthorizedException();
		if (req.user?.role !== "admin") throw new UnauthorizedException();
		const user = await this.usersService.findOne(email);
		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	@UseGuards(AuthGuard)
	@Post("add-task")
	async addTask(@Body() task: Task, @Request() req: ResponseHeader) {
		if (!req.user) throw new UnauthorizedException();

		const user = await this.usersService.addTaskToUser(req.user?.sub, task.id);

		return user;
	}

	@UseGuards(AuthGuard)
	@Post("remove-task")
	async removeTask(@Body() task: Task, @Request() req: ResponseHeader) {
		if (!req.user) throw new UnauthorizedException();

		const user = await this.usersService.removeTaskFromUser(
			req.user?.sub,
			task.id,
		);

		return user;
	}

	// Projects

	@UseGuards(AuthGuard)
	@Post("add-project")
	async addProject(@Body() project: Project, @Request() req: ResponseHeader) {
		if (!req.user) throw new UnauthorizedException();

		const user = await this.usersService.addProjectToUser(
			req.user?.sub,
			project.id,
		);

		return user;
	}

	@UseGuards(AuthGuard)
	@Post("remove-project")
	async removeProject(
		@Body() project: Project,
		@Request() req: ResponseHeader,
	) {
		if (!req.user) throw new UnauthorizedException();

		const user = await this.usersService.removeProjectFromUser(
			req.user?.sub,
			project.id,
		);

		return user;
	}
}
