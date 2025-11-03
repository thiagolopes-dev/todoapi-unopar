import { Document } from 'mongoose';

export class TaskDTO extends Document {
  codigo?: number;
  description: string;
  completed: boolean;
}
