import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  async getAllTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    const taskQuery = this.createQueryBuilder('task');
    taskQuery.andWhere('task.userId = :userId', { userId: user.id });
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
