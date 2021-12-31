import { Component } from '@angular/core';
import { Cetagory } from './interfaces/Cetagory';
import { CetagoriesService } from './services/cetagories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'expense-tracker-app';
  expenses: Cetagory[] = [];
  incomes: Cetagory[] = [];

  constructor() {}

  ngOnInit(): void {}
}
