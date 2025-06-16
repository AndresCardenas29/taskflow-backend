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
import { AuthModule } from "./auth/auth.module";
import { InitializationService } from "./initialization.service";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "sqlite",
			database: "./database.sqlite",
			entities: [Task, User, Project, Comment, Notification],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([User]),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				".env.production",
				".env.development",
				".env.local",
				`.env.${process.env.NODE_ENV}`,
			],
		}),
		TasksModule,
		UsersModule,
		ProjectsModule,
		CommentsModule,
		NotificationsModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService, InitializationService],
	exports: [InitializationService],
})
export class AppModule {}
