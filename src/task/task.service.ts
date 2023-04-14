import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { ITask } from './interfaces/task.interfaces';
import { CreateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  // Injecto mi modelo Task y lo llamo TaskModel que dera del tipo de mi Interface

  constructor(@InjectModel('Task') private taskModel: Model<ITask>) {}

  // Funcion ue devolvera una lista de tareas
  async getTasks(name?: string): Promise<ITask[]> {
    let tasks;
    if (name && typeof name === 'string') {
      tasks = await this.taskModel.findOne({ name: name });
      tasks = [tasks];
    } else {
      tasks = await this.taskModel.find();
    }
    return tasks;
  }

  /**
   * Funsion que solo busca una tarea por ID
   * @returns La tarea buscada
   */
  async getTask(id: string): Promise<ITask> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  /**
   * Funcion para crear la tarea en la BD
   * Recibe una Tarea de tipo CreateTaskDto que sera el objeto que me manda el usuario
   * @returns la Tarea
   */
  async createTask(task: CreateTaskDto): Promise<ITask> {
    const myTask = {
      name: task.name.toLocaleLowerCase(),
      description: task.description,
      category: task.category,
      expirationDate: task.expirationDate,
    };

    const newTask = new this.taskModel(myTask);
    const createDone = await newTask.save();

    return createDone;
  }

  /**
   * Funcion para actualizar las tareas
   * @returns Devuelve la tarea nueva
   */
  async updateTask(id: string, task: CreateTaskDto): Promise<ITask> {
    const taskUpdate = await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
    });
    return taskUpdate;
  }

  /**
   * Funcion para borrar las tareas
   * @returns Devuelve la tarea eliminada
   */
  async deleteTask(id: string): Promise<ITask> {
    const taskDelete = await this.taskModel.findByIdAndDelete(id);
    return taskDelete;
  }
}
