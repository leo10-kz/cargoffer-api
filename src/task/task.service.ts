import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ITask } from './interfaces/task.interfaces';
import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<ITask>) {}

  async getTasks(): Promise<ITask[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getTask(id: string): Promise<ITask> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async createTask(task: CreateTaskDto): Promise<ITask> {
    const newTask = new this.taskModel(task);
    const createDone = await newTask.save();

    return createDone;
  }

  async updateTask(id: string, task: CreateTaskDto): Promise<ITask> {
    const taskUpdate = await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });
    return taskUpdate;
  }

  async deleteTask(id: string): Promise<ITask> {
    const taskDelete = await this.taskModel.findByIdAndDelete(id);
    return taskDelete;
  }
}
