import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createProjectDTO } from './dto/createProjectDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: string, @Res({ passthrough: true }) response: Response) {
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

    return project;
  }

  create(createProjectDTO: createProjectDTO) {
    return this.prisma.project.create({
      data: {
        title: createProjectDTO.title,
        description: createProjectDTO.description,
      },
    });
  }
}
