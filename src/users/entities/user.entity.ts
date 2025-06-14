import { Comment } from "src/comments/entities/comment.entity";
import { Notification } from "src/notifications/entities/notification.entity";
import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Generated,
	OneToMany,
	ManyToMany,
	JoinTable,
} from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	@Generated()
	id: number;

	@Column()
	email: string;

	@Column({ unique: true })
	username: string;

	@Column({ select: false })
	password: string;

	@Column({ default: true })
	is_active: boolean;

	@Column({ default: "member" })
	role: string;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	last_login_at: Date;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	updated_at: Date;

	@ManyToMany(() => Task, (task) => task.assigned_users)
	@JoinTable({
		name: "task_user",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "task_id",
			referencedColumnName: "id",
		},
	})
	tasks: Task[];

	@ManyToMany(() => Project, (project) => project.assigned_users)
	@JoinTable({
		name: "project_user",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "project_id",
			referencedColumnName: "id",
		},
	})
	projects: Project[];

	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];

	@ManyToMany(() => Notification, (notification) => notification.recipients)
	notifications: Notification[];
}
