import { Cetagory } from './Cetagory';

export interface TransactionTosend {
  payee: string;
  amount: number;
  date: Date;
  comment: string;
  category: Cetagory;
}
