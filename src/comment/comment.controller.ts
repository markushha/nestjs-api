import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommentService } from './comment.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createCommentDTO } from './dto/createCommentDto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':projectId')
  getProjectComments(
    @Param('projectId') projectId: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.commentService.getProjectComments(projectId, response);
  }

  @Post(':projectId')
  createComment(
    @Param('projectId') projectId: string,
    @Res({ passthrough: true }) response: Response,
    @Body() createCommentDTO: createCommentDTO,
  ) {
    return this.commentService.createComment(
      createCommentDTO,
      projectId,
      response,
    );
  }
}
