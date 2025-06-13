import { User } from "../../users/entities/user.entity";
import { Task } from "../../tasks/entities/task.entity";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Generated,
	ManyToOne,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Notification } from "src/notifications/entities/notification.entity";

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

	@OneToOne(() => Notification, (notification) => notification.comment)
	@JoinColumn()
	notification: Notification;
}
