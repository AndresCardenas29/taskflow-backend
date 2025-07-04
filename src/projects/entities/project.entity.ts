import { User } from "../../users/entities/user.entity";
import {
	Column,
	Entity,
	Generated,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	@Generated()
	id: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column({ default: "active" })
	status: string;

	@ManyToMany(() => User, (user) => user.projects)
	assigned_users: User[];
}
