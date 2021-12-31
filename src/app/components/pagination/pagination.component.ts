import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeComponent } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 1;
  @Input() limit: number = 10;
  @Input() count: number = 0;
  @Output() changeLimitEvent = new EventEmitter<number>();
  @Output() changePageEvent = new EventEmitter<number>();
  maxPage: number = 0;

  constructor(private homeComponent: HomeComponent) {}

  ngOnInit(): void {}

  handleChangeLimit(e: Event) {
    this.changeLimitEvent.emit(+e);
  }

  handleClickNewPage(e: Event) {
    this.changePageEvent.emit(+e);
  }

  genArrayPage() {
    this.maxPage = Math.ceil(this.count / this.limit);
    const result = new Array(this.maxPage).fill('').map((item, index) => {
      return index + 1;
    });
    return result;
  }

  handleClickNextPage(e: Event) {
    e.preventDefault();
    if (Math.ceil(this.count / this.limit) > this.page) {
      this.changePageEvent.emit(this.page + 1);
    }
  }

  handleClickPage(e: Event, page: number) {
    e.preventDefault();
    this.changePageEvent.emit(page);
  }

  handleClickPrevPage(e: Event) {
    e.preventDefault();
    if (1 < this.page) {
      this.changePageEvent.emit(this.page - 1);
    }
  }
}
