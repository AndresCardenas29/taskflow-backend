import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	UnauthorizedException,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtData } from "src/auth/auth.service";

// tipado del header de la respuesta
interface ResponseHeader {
	user?: JwtData;
}

@Controller("comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@UseGuards(AuthGuard)
	@Post()
	create(
		@Body() createCommentDto: CreateCommentDto,
		@Request() req: ResponseHeader,
	) {
		if (!req.user) throw new UnauthorizedException();

		return this.commentsService.create(createCommentDto, req.user?.sub);
	}

	@Get()
	findAll() {
		return this.commentsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.commentsService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
		return this.commentsService.update(+id, updateCommentDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.commentsService.remove(+id);
	}
}
