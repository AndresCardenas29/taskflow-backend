import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";

type responseData = {
	error: boolean;
	msg: string;
	data: Task | null;
};

type responseDataArr = {
	error: boolean;
	msg: string;
	data: Task[] | null;
};

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private taskRepository: Repository<Task>,
	) {}

	async create(createTaskDto: CreateTaskDto) {
		const dta: Task = {
			id: Math.floor(Math.random() * 100),
			title: createTaskDto.title,
			description: createTaskDto.description,
			status: "created",
			created_at: new Date(),
			updated_at: new Date(),
			assigned_users: [],
			deadline: new Date(),
			comments: [],
		};
		// listTaks.push(dta);

		const tsk = this.taskRepository.create(dta);

		return this.taskRepository.save(tsk);
	}

	async findAll(status?: string): Promise<responseDataArr> {
		if (status) {
			return {
				error: false,
				msg: "Taks",
				data: await this.taskRepository.find({ where: { status } }),
			};
		}
		return {
			error: false,
			msg: "Taks",
			data: await this.taskRepository.find({
				where: { status: Not("deleted") },
			}),
		};
	}

	async findOne(id: number): Promise<responseData> {
		const findTask = await this.taskRepository.findOneBy({ id });

		if (!findTask) {
			return {
				error: true,
				msg: "Task not found",
				data: null,
			};
		}

		return {
			error: false,
			msg: "Task find",
			data: findTask,
		};
	}

	async update(
		id: number,
		updateTaskDto: UpdateTaskDto,
	): Promise<responseData> {
		const findTask = await this.taskRepository.findOneBy({ id });

		if (!findTask) {
			return {
				error: true,
				msg: "Task not found",
				data: null,
			};
		}

		if (updateTaskDto.title !== undefined) {
			findTask.title = updateTaskDto.title;
		}
		if (updateTaskDto.description !== undefined) {
			findTask.description = updateTaskDto.description;
		}
		if (updateTaskDto.status !== undefined) {
			findTask.status = updateTaskDto.status;
		}

		findTask.updated_at = new Date();

		const response = await this.taskRepository.save(findTask);

		return {
			error: false,
			msg: "Task updated",
			data: response,
		};
	}

	async remove(id: number) {
		const findTask = await this.taskRepository.findOneBy({ id });

		if (!findTask) {
			return {
				error: true,
				msg: "Task not found",
				data: null,
			};
		}

		// delete
		findTask.status = "deleted";
		findTask.updated_at = new Date();

		const response = await this.taskRepository.save(findTask);

		return {
			error: false,
			msg: "Task find",
			data: response,
		};
	}
}
