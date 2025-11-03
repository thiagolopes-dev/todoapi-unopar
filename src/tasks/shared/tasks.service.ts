import { TaskDTO } from '../dto/task';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from '../schema/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDTO>,
  ) { }

  async create(taskDto: TaskDTO): Promise<TaskDocument> {
    const { description, ...rest } = taskDto;
    const MaxId = await this.taskModel.findOne({}, 'codigo').sort({ codigo: -1 });
    const nextId = MaxId ? MaxId.codigo + 1 : 1;
    const createTask = new this.taskModel({
      ...rest,
      description,
      codigo: nextId
    });

    return await createTask.save();
  }

  async getAll() {
    return await this.taskModel.find().exec();
  }

  async getById(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: string, task: TaskDTO) {
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