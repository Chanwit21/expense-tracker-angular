import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';
import { SummaryCardComponent } from './components/expense-summary/summary-card/summary-card.component';
import { FilterComponent } from './components/filter/filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { ListComponent } from './components/list-container/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ExpenseSummaryComponent,
    SummaryCardComponent,
    FilterComponent,
    PaginationComponent,
    ListContainerComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
