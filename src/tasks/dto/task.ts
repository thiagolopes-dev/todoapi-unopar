import { Document } from 'mongoose';

export class TaskModel extends Document {
  description: string;
  completed: boolean;
}
