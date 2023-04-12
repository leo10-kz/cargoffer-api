import {
  Controller,
  Body,
  Param,
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
  constructor(private taskServise: TaskService) {}
  @Post('/')
  async createTask(@Res() res, @Body() task: CreateTaskDto) {
    const response = await this.taskServise.createTask(task);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Created New Task', Task: response });
  }

  @Get('/')
  async getTasks(@Res() res) {
    const response = await this.taskServise.getTasks();

    return res.status(HttpStatus.OK).json({ Tasks: response });
  }

  @Get('/:id')
  async getTask(@Res() res, @Param('id') id: string) {
    const response = await this.taskServise.getTask(id);

    if (!response) throw new NotFoundException('Task not found');

    return res.status(HttpStatus.OK).json({ Task: response });
  }

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

  @Delete('/:id')
  async deleteTask(@Res() res, @Param('id') id: string) {
    const response = await this.taskServise.deleteTask(id);
    if (!response) throw new NotFoundException('Task does not exist');

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Delete successfully', Task: response });
  }
}
