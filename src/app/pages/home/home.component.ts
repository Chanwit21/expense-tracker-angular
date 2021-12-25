import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Summary } from 'src/app/interfaces/Summary';
import { Transaction } from 'src/app/interfaces/Transaction';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [];
  limit: number = 10;
  page: number = 1;
  countPage: number = 0;
  search: string = '';
  month: string = '';
  year: string = '';
  summary: Summary = { income: 0, expense: 0, networth: 0 };
  searchTimeOut: any = '';

  constructor(private transactionService: TransactionsService) {}

  getTransaction() {
    this.transactionService
      .getQuery(
        this.limit,
        this.limit * (this.page - 1),
        this.search,
        this.month,
        this.year
      )
      .subscribe((res: any) => {
        const { transactions, count } = res;
        this.transactions = transactions;
        this.countPage = count.countTransactions;
        const [income, expense] = this.transactions.reduce(
          (acc: Array<number>, cur: Transaction): Array<number> => {
            const {
              category: { type },
            } = cur;

            if (type === 'EXPENSE') {
              const newAcc = [...acc];
              newAcc[1] = acc[1] + +cur.amount;
              return newAcc;
            } else if (type === 'INCOME') {
              const newAcc = [...acc];
              newAcc[0] = acc[0] + +cur.amount;
              return newAcc;
            }

            return acc;
          },
          [0, 0]
        );
        this.summary = { income, expense, networth: income + expense };
      });
  }

  ngOnInit(): void {
    this.getTransaction();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  handleChangeLimit(newLimit: number) {
    this.limit = newLimit;
    this.getTransaction();
  }

  handleClickNewPage(newPage: number) {
    this.page = newPage;
    this.getTransaction();
  }

  handleChangeSearch(newSearch: string) {
    this.search = newSearch;
    if (newSearch) {
      clearTimeout(this.searchTimeOut);
      this.searchTimeOut = setTimeout(() => {
        this.getTransaction();
      }, 2000);
    } else {
      this.getTransaction();
    }
  }

  handleChangeMonth(newMonth: string) {
    this.month = newMonth;
    this.getTransaction();
  }

  handleChangeYear(newYear: string) {
    this.year = newYear;
    this.getTransaction();
  }
}
