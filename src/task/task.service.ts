import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ITask } from './interfaces/task.interfaces';
import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private productModel: Model<ITask>) {}
}
