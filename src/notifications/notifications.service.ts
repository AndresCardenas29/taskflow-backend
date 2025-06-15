import { Injectable } from "@nestjs/common";
// import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Repository } from "typeorm";
// import { Task } from "src/tasks/entities/task.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class NotificationsService {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationRepository: Repository<Notification>,
	) {}

	async create(comment: Comment, users: User[]) {
		const notification = this.notificationRepository.create({
			is_read: false,
			comment: comment,
			recipients: users,
		});

		await this.notificationRepository.save(notification);

		console.log({ notification });

		if (notification) return true;
		else return false;
	}

	findAll() {
		return `This action returns all notifications`;
	}

	findOne(id: number) {
		return `This action returns a #${id} notification`;
	}

	update(id: number, updateNotificationDto: UpdateNotificationDto) {
		return {
			msg: `This action updates a #${id} notification`,
			updateNotificationDto,
		};
	}

	remove(id: number) {
		return `This action removes a #${id} notification`;
	}
}
