import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { createCommentDTO } from './dto/createCommentDto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getProjectComments(projectId: string, res: Response) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: Number(projectId),
      },
    });

    if (!project) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: 'Project not found.',
        status: 404,
      });
    }

    const comments = await this.prisma.comment.findMany({
      where: {
        projectId: Number(projectId),
      },
    });

    return res.status(HttpStatus.FOUND).send({
      message: 'Successfully found all comments.',
      status: 302,
      data: {
        comments,
      },
    });
  }

  async createComment(
    createCommentDTO: createCommentDTO,
    projectId: string,
    res: Response,
  ) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: Number(projectId),
      },
      include: {
        comments: true,
      },
    });

    if (!project) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: 'Project not found.',
        status: 404,
      });
    }

    const createdComment = await this.prisma.comment.create({
      data: {
        projectId: Number(projectId),
        text: createCommentDTO.text,
      },
    });

    return res.status(HttpStatus.CREATED).send({
      message: 'Successfully created a new comment.',
      status: 201,
      data: {
        comment: createdComment,
      },
    });
  }
}
