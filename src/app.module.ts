import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ProjectModule, CommentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
