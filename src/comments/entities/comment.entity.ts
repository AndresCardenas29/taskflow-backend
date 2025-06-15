import { User } from "../../users/entities/user.entity";
import { Task } from "../../tasks/entities/task.entity";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Generated,
	ManyToOne,
} from "typeorm";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	@Generated()
	id: number;

	@Column({ nullable: false })
	content: string;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@ManyToOne(() => Task, (task) => task.comments)
	task: Task;

	@ManyToOne(() => User, (user) => user.comments)
	user: User;
}
