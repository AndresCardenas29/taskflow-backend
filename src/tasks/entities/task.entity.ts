import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Generated,
	ManyToMany,
	OneToMany,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	@Generated()
	id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column({ type: "datetime", nullable: true })
	deadline: Date;

	@Column({ default: "created" })
	status: string;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	updated_at: Date;

	@ManyToMany(() => User, (user) => user.tasks)
	assigned_users: User[];

	// relation with comment entity
	@OneToMany(() => Comment, (comment) => comment.task)
	comments: Comment[];
}
