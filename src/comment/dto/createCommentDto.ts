import { IsNumber, IsString } from 'class-validator';
// import { createProjectDTO } from 'src/project/dto/createProjectDto';

export class createCommentDTO {
  // @IsString()
  // title?: string;
  @IsString()
  text: string;
  @IsNumber()
  projectId: number;
  // @IsObject()
  // author?: {
  //   authorId: number;
  //   name: string;
  //   email?: string;
  //   pfp?: string;
  // };
  // @IsObject()
  // project?: createProjectDTO;
}
