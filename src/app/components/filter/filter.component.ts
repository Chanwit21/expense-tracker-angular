import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Input() search: string = '';
  @Input() month: string = '';
  @Input() year: string = '';
  constructor(private home: HomeComponent) {}

  ngOnInit(): void {}

  handleChangeSearch(newSearch: string) {
    this.home.handleChangeSearch(newSearch);
  }

  handleClickClearSearch() {
    this.home.handleChangeSearch('');
  }

  handleChangeMonth(newMonth: string) {
    this.home.handleChangeMonth(newMonth);
  }

  handleClickClearMonth() {
    this.home.handleChangeMonth('');
  }

  handleChangeYear(newYear: string) {
    this.home.handleChangeYear(newYear);
  }

  handleClickClearYear() {
    this.home.handleChangeYear('');
  }
}
