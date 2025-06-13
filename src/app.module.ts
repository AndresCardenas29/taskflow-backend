import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./tasks/entities/task.entity";
import { User } from "./users/entities/user.entity";
import { Project } from "./projects/entities/project.entity";
import { Notification } from "./notifications/entities/notification.entity";
import { Comment } from "./comments/entities/comment.entity";
import { UsersModule } from "./users/users.module";
import { ProjectsModule } from "./projects/projects.module";
import { CommentsModule } from "./comments/comments.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "sqlite",
			database: "./database.sqlite",
			entities: [Task, User, Project, Comment, Notification],
			synchronize: true,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV
				? `.env.${process.env.NODE_ENV}`
				: ".env.local",
		}),
		TasksModule,
		UsersModule,
		ProjectsModule,
		CommentsModule,
		NotificationsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
