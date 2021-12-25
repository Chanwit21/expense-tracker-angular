import { Component, Input, OnInit } from '@angular/core';
import { Summary } from 'src/app/interfaces/Summary';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css'],
})
export class ExpenseSummaryComponent implements OnInit {
  @Input() summary: Summary = { income: 0, expense: 0, networth: 0 };
  constructor() {}

  ngOnInit(): void {}
}
