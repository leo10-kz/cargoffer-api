import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  @Post('/create')
  createTask(@Res() res, @Body() task: CreateTaskDto) {
    console.log(task);

    return res.status(HttpStatus.OK).json({ message: 'recibido' });
  }
}
