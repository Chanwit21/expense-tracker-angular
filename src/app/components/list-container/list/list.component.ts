import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/Transaction';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() transaction: Transaction = {
    payee: '',
    amount: 0,
    date: new Date(),
    comment: '',
    category: {
      title: '',
      type: '',
    },
  };

  constructor() {}

  ngOnInit(): void {}

  getDateMonth(): any {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(this.transaction.date));
  }

  getDateOnly(): any {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
    }).format(new Date(this.transaction.date));
  }

  getPrice() {
    return new Intl.NumberFormat('us-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    }).format(this.transaction.amount);
  }
}
