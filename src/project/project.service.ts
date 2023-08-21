import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProjectDTO, updateProjectDTO } from './dto/createProjectDto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findAll(response: Response) {
    const projects = await this.prisma.project.findMany({
      include: {
        comments: true,
      },
    });

    return response.status(HttpStatus.FOUND).send({
      message: 'All projects have been succesfully found',
      status: 302,
      data: {
        projects,
      },
    });
  }

  async findOne(id: string, response: Response) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        comments: true,
      },
    });

    if (!project)
      return response.status(HttpStatus.NOT_FOUND).send({
        error: 'Project not found',
        status: 404,
      });

    return response.status(HttpStatus.FOUND).send({
      message: 'Project have been succesfully found',
      status: 302,
      data: {
        project,
      },
    });
  }

  async create(createProjectDTO: createProjectDTO, response: Response) {
    const createdProject = await this.prisma.project.create({
      data: {
        title: createProjectDTO.title,
        description: createProjectDTO.description,
      },
    });

    return response.status(HttpStatus.CREATED).send({
      message: 'Project have been succesfully created',
      status: 201,
      data: { project: createdProject },
    });
  }

  async update(
    id: string,
    updateProjectDTO: updateProjectDTO,
    response: Response,
  ) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!project)
      return response.status(HttpStatus.NOT_FOUND).send({
        error: 'Project not found',
        status: 404,
      });

    const updatedProject = await this.prisma.project.update({
      where: {
        id: Number(id),
      },
      data: {
        title: updateProjectDTO.title,
        description: updateProjectDTO.description,
      },
      include: {
        comments: true,
      },
    });

    if (
      project.title.trim() === updatedProject.title.trim() &&
      project.description.trim() === updatedProject.description.trim()
    ) {
      return response.status(HttpStatus.NOT_MODIFIED).send({
        message: 'Project have not been modified',
        status: 304,
      });
    }

    return response.status(HttpStatus.OK).send({
      message: 'Project have been succesfully updated',
      status: 200,
      data: {
        project: updatedProject,
      },
    });
  }

  async delete(id: string, response: Response) {
    const deletedProject = await this.prisma.project.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedProject) {
      return response.status(HttpStatus.NOT_FOUND).send({
        error: 'Project not found',
        status: 404,
      });
    }

    return response.status(HttpStatus.ACCEPTED).send({
      message: 'Project have been succesfully deleted',
      status: 202,
    });
  }

  async addComment(
    id: string,
    response: Response,
    createProjectDTO: createProjectDTO,
  ) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        comments: true,
      },
    });

    if (!project) {
      return response.status(HttpStatus.NOT_FOUND).send({
        error: 'Project not found',
        status: 404,
      });
    }

    const comment = await this.prisma.comment.create({
      data: {
        projectId: Number(id),
        text: createProjectDTO.comments.text,
      },
    });

    return response.status(HttpStatus.CREATED).send({
      message: 'Comment have been succesfully created',
      status: 201,
      data: {
        comment,
      },
    });
  }
}
