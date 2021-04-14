import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      id: uuidv4()
    };
    this.tasks.push(task);
    return task;
  }
}
