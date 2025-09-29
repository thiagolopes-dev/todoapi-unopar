import { TaskModel } from '../dto/task';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskModel>,
  ) {}

  async create(task: TaskModel) {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async list() {
    return await this.taskModel.find().exec();
  }
}
