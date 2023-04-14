import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  // Instacia de la clase TaskService para poder usar sus metodos
  constructor(private taskServise: TaskService) {}

  /**
   * Endpoint para la creacion de tareas
   * @body Task
   * @returns Devolvera un JSON con un mensaje y la tarea creada
   */
  @Post('/')
  async createTask(@Res() res, @Body() task: CreateTaskDto) {
    const response = await this.taskServise.createTask(task);

    if (!response) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Could not create' });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Created New Task', Task: response });
  }

  /**
   * Endpoint que devuleve una lista de tareas
   * @returns Todas las tareas
   */
  @Get('/')
  async getTasks(@Res() res, @Query('name') name: string) {
    let response: any;
    if (name) {
      response = await this.taskServise.getTasks(name);
    } else {
      response = await this.taskServise.getTasks();
    }

    return res.status(HttpStatus.OK).json({ tasks: response });
  }

  /**
   * Endpoint que para la busqueda de una tarea por ID
   * @param id {string}
   * @returns Una tarea especifica
   */
  @Get('/:id')
  async getTask(@Res() res, @Param('id') id: string) {
    const response = await this.taskServise.getTask(id);

    if (!response) throw new NotFoundException('Task not found');

    return res.status(HttpStatus.OK).json({ task: response });
  }

  /**
   * Enpoint para actualuzar las tareas
   * @param id {string} obligatorio
   * @body task de tipo CreateTasDto
   * @returns Un JSON con un mensaje y la tarea actualizada
   */
  @Put('/:id')
  async updateTask(
    @Res() res,
    @Body() task: CreateTaskDto,
    @Param('id') id: string,
  ) {
    const response = await this.taskServise.updateTask(id, task);
    if (!response) throw new NotFoundException('Task does not exist');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Update successfully', Task: response });
  }

  /**
   * Endpoint para borrar tareas
   * @param id {string} obligatorio
   * @returns un JSON con un mensaje y la tarea borrada
   */
  @Delete('/:id')
  async deleteTask(@Res() res, @Param('id') id: string) {
    const response = await this.taskServise.deleteTask(id);
    if (!response) throw new NotFoundException('Task does not exist');

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Delete successfully', Task: response });
  }
}
