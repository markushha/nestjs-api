import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProjectDTO, updateProjectDTO } from './dto/createProjectDto';
import { ProjectService } from './project.service';
import { CommentService } from 'src/comment/comment.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  getProjects(@Res({ passthrough: true }) response: Response) {
    return this.projectService.findAll(response);
  }

  @Get(':id')
  getProject(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.projectService.findOne(id, response);
  }

  // @Get(':id/comments')
  // getProjectComments(@Param('id') id: string) {
  //   return this.commentService.getProjectComments(id);
  // }

  @Post()
  createProject(
    @Body() createProjectDTO: createProjectDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.projectService.create(createProjectDTO, response);
  }

  @Post(':id/comments')
  createComment(
    @Param('id') id: string,
    @Body() createProjectDTO: createProjectDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.projectService.addComment(id, response, createProjectDTO);
  }

  @Patch(':id')
  updateProject(
    @Body() updateProjectDTO: updateProjectDTO,
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.projectService.update(id, updateProjectDTO, response);
  }

  @Delete(':id')
  deleteProject(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.projectService.delete(id, response);
  }
}
