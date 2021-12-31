import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/interfaces/Transaction';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() transaction: Transaction = {
    id: 0,
    payee: '',
    amount: 0,
    date: new Date(),
    comment: '',
    category: {
      id: 0,
      title: '',
      type: '',
    },
  };

  constructor(private homeComponent: HomeComponent, private router: Router) {}

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

  deleteTransaction(id: number) {
    this.homeComponent.deleteTransaction(id);
  }

  handleClickToEdit(id: number) {
    this.router.navigate(['/add-expense', id]);
  }
}
