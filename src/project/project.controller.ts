import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProjectDTO } from './dto/createProjectDto';
import { ProjectService } from './project.service';
import { CommentService } from 'src/comment/comment.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  getProjects() {
    return this.projectService.findAll();
  }

  @Get(':id')
  getProject(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.projectService.findOne(id, response);
  }

  @Get(':id/comments')
  getProjectComments(@Param('id') id: string) {
    return this.commentService.getProjectComments(id);
  }

  @Post()
  createProject(@Body() createProjectDTO: createProjectDTO) {
    return this.projectService.create(createProjectDTO);
  }
}
