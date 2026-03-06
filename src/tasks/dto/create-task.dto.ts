import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskPriority } from '../entities/task.entity';

export class CreateTaskDto {

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

}