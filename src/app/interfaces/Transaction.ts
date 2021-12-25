import { Cetagory } from './Cetagory';

export interface Transaction {
  payee: string;
  amount: number;
  date: Date;
  comment: string;
  category: Cetagory;
}
