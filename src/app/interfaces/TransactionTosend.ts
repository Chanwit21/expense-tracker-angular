export interface TransactionTosend {
  payee: string;
  amount: number;
  date: Date;
  comment: string;
  category_id: number;
}
