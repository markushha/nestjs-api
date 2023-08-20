import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  getProjectComments(id: string) {
    return `Comments of project ${id}`;
  }
}
