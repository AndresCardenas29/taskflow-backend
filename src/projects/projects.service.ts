import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./entities/project.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

type responseData = {
	error: string;
	msg: string;
	data: Project | Project[] | null;
};

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private projectRepository: Repository<Project>,
	) {}

	create(createProjectDto: CreateProjectDto) {
		const project = this.projectRepository.create(createProjectDto);
		return this.projectRepository.save(project);
	}

	findAll() {
		return this.projectRepository.find();
	}

	findOne(id: number) {
		return this.projectRepository.findOneBy({
			id,
		});
	}

	async update(id: number, updateProjectDto: UpdateProjectDto) {
		const project = await this.projectRepository.findOneBy({
			id,
		});
		if (!project) {
			throw new NotFoundException("Project not found");
		}
		const updatedProject = this.projectRepository.merge(
			project,
			updateProjectDto,
		);
		return this.projectRepository.save(updatedProject);
	}

	async remove(id: number): Promise<responseData> {
		const project = await this.projectRepository.findOneBy({
			id,
		});
		if (!project) {
			throw new NotFoundException("Project not found");
		}
		await this.projectRepository.remove(project);
		return { msg: "Project deleted successfully", data: null, error: "" };
	}
}
