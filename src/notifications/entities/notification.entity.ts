import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import {
	Column,
	Entity,
	Generated,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Notification {
	@PrimaryGeneratedColumn()
	@Generated()
	id: number;

	@Column({ nullable: false, default: false })
	is_read: boolean;

	@Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
	created_at: Date;

	@OneToOne(() => Comment)
	@JoinColumn()
	comment: Comment;

	@ManyToMany(() => User, (user) => user.notifications)
	@JoinTable()
	recipients: User[];
}
