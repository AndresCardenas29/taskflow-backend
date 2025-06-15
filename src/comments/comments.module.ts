import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { Task } from "src/tasks/entities/task.entity";
import { User } from "src/users/entities/user.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([Comment, Task, User, Notification]),
		NotificationsModule,
	],
	controllers: [CommentsController],
	providers: [CommentsService],
	exports: [CommentsService],
})
export class CommentsModule {}
