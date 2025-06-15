import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
	@IsString()
	@IsNotEmpty()
	content: string;

	@IsNumber()
	@IsNotEmpty()
	task_id: number;
}
