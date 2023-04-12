import { Schema } from 'mongoose';

// Schema de tareas donde la propiedad expirationDate sera de tipo date
// en caso de no recibir nada por default recivira un new date
export const TaskSchema = new Schema({
  name: String,
  description: String,
  category: String,
  expirationDate: {
    type: Date,
    default: Date.now,
  },
});
