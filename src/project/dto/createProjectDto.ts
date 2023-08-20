import { IsString } from 'class-validator';

export class createProjectDTO {
  @IsString()
  title: string;
  @IsString()
  description: string;
}
