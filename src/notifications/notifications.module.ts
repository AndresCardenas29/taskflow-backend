import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";

@Module({
	controllers: [NotificationsController],
	providers: [NotificationsService],
	imports: [TypeOrmModule.forFeature([Notification, Comment, Task, User])],
	exports: [NotificationsService],
})
export class NotificationsModule {}
