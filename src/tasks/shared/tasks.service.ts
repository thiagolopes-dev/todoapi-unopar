import { TaskModel } from '../dto/task';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskModel>,
  ) { }

  async create(task: TaskModel) {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async getAll() {
    return await this.taskModel.find().exec();
  }

  async getById(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: string, task: TaskModel) {
    await this.taskModel.updateOne(
      { _id: id },
      { $set: task }
    ).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return this.taskModel.deleteOne({
      _id: id
    }).exec();
  }
}