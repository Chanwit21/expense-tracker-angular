import { Cetagory } from './Cetagory';

export interface Transaction {
  id: number;
  payee: string;
  amount: number;
  date: Date;
  comment: string;
  category: Cetagory;
}
