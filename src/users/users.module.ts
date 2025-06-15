import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";

@Module({
	imports: [TypeOrmModule.forFeature([User, Task, Project])],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
