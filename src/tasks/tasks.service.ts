import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFiltertedTasks(filterTaskDto: FilterTaskDto): Task[] {
    const { status, search } = filterTaskDto;
    let tasks = [...this.tasks];
    if (search) {
      tasks = tasks.filter((task) => task.title === search);
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuidv4(),
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      return task;
    } else {
      throw new NotFoundException(`task with the id ${id} not found`);
    }
  }

  deleteTaskById(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return id;
  }

  patchTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
