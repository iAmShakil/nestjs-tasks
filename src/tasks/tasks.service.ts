import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getFiltertedTasks(filterTaskDto: FilterTaskDto): Task[] {
  //   const { status, search } = filterTaskDto;
  //   let tasks = [...this.tasks];
  //   if (search) {
  //     tasks = tasks.filter((task) => task.title === search);
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   return tasks;
  // }

  createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found.`);
    }
    return found;
  }

  // deleteTaskById(id: string): string {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   return id;
  // }

  // patchTaskById(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
