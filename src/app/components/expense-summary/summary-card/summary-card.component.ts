import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css'],
})
export class SummaryCardComponent implements OnInit {
  @Input() bgColor: string = 'bg-info';
  @Input() summary: number = 12000000;
  @Input() text: string = '';

  constructor() {}

  ngOnInit(): void {}

  formatPrice(num: number): string {
    return new Intl.NumberFormat('us-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    }).format(num);
  }
}
