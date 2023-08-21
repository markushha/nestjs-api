import { IsArray, IsNotEmptyObject, IsString } from 'class-validator';
import { createCommentDTO } from 'src/comment/dto/createCommentDto';

export class createProjectDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNotEmptyObject()
  comments?: createCommentDTO;
}

export class updateProjectDTO {
  @IsString()
  title?: string;
  @IsString()
  description?: string;
  @IsArray()
  comments?: createCommentDTO[];
}
