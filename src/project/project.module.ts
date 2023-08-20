import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { CommentService } from 'src/comment/comment.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, CommentService, PrismaService],
})
export class ProjectModule {}
