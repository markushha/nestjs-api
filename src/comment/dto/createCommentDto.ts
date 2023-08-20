import { IsNumber, IsString } from 'class-validator';

export class createCommentDTO {
  @IsString()
  title: string;
  @IsString()
  text: string;
  @IsNumber()
  projectUd: number;
  @IsString()
  author: string;
}
