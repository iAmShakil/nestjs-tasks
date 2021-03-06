import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getAllTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.taskRepository.getAllTasks(filterTaskDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    return found;
  }

  async deleteTaskById(id: number, user: User): Promise<number> {
    const task = await this.getTaskById(id, user);
    if (task) {
      await this.taskRepository.delete({
        id: id,
      });
    }
    return id;
  }

  async patchTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
