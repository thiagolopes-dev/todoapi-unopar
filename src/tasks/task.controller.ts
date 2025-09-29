import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskModel } from './dto/task';
import { TaskService } from './shared/tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskModel) {
    return await this.taskService.create(task);
  }

  @Get()
  async findAll() {
    return await this.taskService.list();
  }
}
