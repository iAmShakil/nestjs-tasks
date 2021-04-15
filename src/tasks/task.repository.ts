import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

  async getAllTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const taskQuery = this.createQueryBuilder('task');
    if (filterTaskDto.status) {
      taskQuery.andWhere('task.status = :status', {
        status: filterTaskDto.status,
      });
    }
    if (filterTaskDto.search) {
      taskQuery.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: filterTaskDto.search },
      );
    }
    return taskQuery.getMany();
  }
}
