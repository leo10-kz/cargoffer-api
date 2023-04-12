import { Document } from 'mongoose';

// Extiendo de Document de mongoose por que mi modelo requiere que mi interfas sea un modelo
// y no un interfas como tal
export interface ITask extends Document {
  name: string;
  description: string;
  category: string;
  expirationDate: Date;
}
