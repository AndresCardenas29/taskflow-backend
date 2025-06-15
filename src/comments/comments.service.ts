import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import { NotificationsService } from "src/notifications/notifications.service";

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Notification)
		private readonly notificationRepository: Repository<Notification>,
		private notificationsService: NotificationsService,
	) {}

	async create(createCommentDto: CreateCommentDto, userId: number) {
		// find the task by id
		if (!createCommentDto.task_id || !userId) {
			throw new NotFoundException(
				`Se requiere un task_id y un usuario para crear una nueva tarea`,
			);
		}
		const task = await this.taskRepository.findOne({
			where: { id: createCommentDto.task_id },
			relations: ["assigned_users"],
		});

		if (!task) {
			throw new NotFoundException(
				`No se encontró el task con id ${createCommentDto.task_id}`,
			);
		}

		const user = await this.userRepository.findOne({
			where: { id: userId },
		});
		if (!user) {
			throw new NotFoundException(`No se encontró el recurso con id ${userId}`);
		}

		const recipentsIds: User[] = task?.assigned_users
			.filter((u) => u.id !== user?.id)
			.map((u) => u);

		const comment = this.commentRepository.create({
			content: createCommentDto.content,
			user,
			task,
		});

		// create the notification
		const notification = await this.notificationsService.create(
			comment,
			recipentsIds,
		);

		console.log({ notification });

		return this.commentRepository.save(comment);
	}

	findAll() {
		return `This action returns all comments`;
	}

	findOne(id: number) {
		return `This action returns a #${id} comment`;
	}

	update(id: number, updateCommentDto: UpdateCommentDto) {
		return { msg: `This action updates a #${id} comment`, updateCommentDto };
	}

	remove(id: number) {
		return `This action removes a #${id} comment`;
	}
}
