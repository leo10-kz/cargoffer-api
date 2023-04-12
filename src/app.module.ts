import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

// Importo mi modulo y creo la coneccion a mi Base de Datos de mongo
@Module({
  imports: [TaskModule, MongooseModule.forRoot('mongodb://localhost/tasks')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
