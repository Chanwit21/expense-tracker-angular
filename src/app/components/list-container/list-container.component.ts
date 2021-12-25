import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/Transaction';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
