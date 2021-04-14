import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { FilterTaskDto } from './dto/task-filter.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  tasks(@Query() filterTaskDto: FilterTaskDto): Task[] {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.getFiltertedTasks(filterTaskDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  patchTaskById(
    @Param('id') id: string,
    @Body() patchTaskDto: PatchTaskDto,
  ): Task {
    return this.tasksService.patchTaskById(id, patchTaskDto.status);
  }
}
