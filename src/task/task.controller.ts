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
} from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskServise: TaskService) {}
  @Post('/create')
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
  async getTask(@Res() res, @Param('id') id) {
    const response = await this.taskServise.getTask(id);
    return res.status(HttpStatus.OK).json({ Task: response });
  }
}
