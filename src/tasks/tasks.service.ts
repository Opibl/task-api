import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(dto);
    return await this.taskRepository.save(task);
  }

  async findAll(status?: string, priority?: string): Promise<Task[]> {

    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (priority) {
      query.andWhere('task.priority = :priority', { priority });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<Task> {

    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task> {

    const task = await this.findOne(id);

    Object.assign(task, dto);

    return await this.taskRepository.save(task);
  }

  async updateStatus(id: number, dto: UpdateStatusDto): Promise<Task> {

    const task = await this.findOne(id);

    task.status = dto.status;

    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<{ message: string }> {

    const task = await this.findOne(id);

    await this.taskRepository.remove(task);

    return { message: 'Task deleted' };
  }
}