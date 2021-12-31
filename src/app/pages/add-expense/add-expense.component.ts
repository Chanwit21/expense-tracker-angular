import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Cetagory } from 'src/app/interfaces/Cetagory';
import { TransactionTosend } from 'src/app/interfaces/TransactionTosend';
import { CetagoriesService } from 'src/app/services/cetagories.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  errorForm: any = {
    payee: '',
    amount: '',
    date: '',
  };
  expenses: Cetagory[] = [];
  incomes: Cetagory[] = [];
  onEdit: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private router: Router,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private cetagoriesService: CetagoriesService
  ) {
    this.expenseForm = this.formBuilder.group({
      type: ['EXPENSE'],
      payee: [''],
      amount: [''],
      date: [''],
      comment: [''],
      categoryId: [''],
    });
  }

  ngOnInit(): void {
    this.cetagoriesService.getAll().subscribe((res: any): void => {
      const { expenses, incomes } = res.reduce(
        (acc: any, cur: Cetagory) => {
          const { type } = cur;
          const newAcc = { ...acc };
          if (type === 'EXPENSE') {
            const newExpenses = [...newAcc.expenses, cur];
            newAcc.expenses = newExpenses;
            return newAcc;
          } else if (type === 'INCOME') {
            const newIncomes = [...newAcc.incomes, cur];
            newAcc.incomes = newIncomes;
            return newAcc;
          }
          return acc;
        },
        {
          expenses: [],
          incomes: [],
        }
      );

      this.expenses = expenses;
      this.incomes = incomes;

      this.route.params.subscribe((params) => {
        this.id = +params['id'];
        if (params['id'] === 'add') {
          this.onEdit = false;
          this.expenseForm.setValue({
            type: 'EXPENSE',
            payee: '',
            amount: '',
            date: '',
            comment: '',
            categoryId: '' + expenses[0].id,
          });
        } else if (!isNaN(params['id'])) {
          this.onEdit = true;
          this.transactionsService
            .getOne(params['id'])
            .subscribe((res: any) => {
              const {
                category: { id, type },
                payee,
                amount,
                date,
                comment,
              } = res;
              this.expenseForm.setValue({
                type: type,
                payee: payee,
                amount: amount,
                date: date,
                comment: comment,
                categoryId: '' + id,
              });
            });
        }
      });
    });
  }

  handleChangeType(e: any) {
    const { value } = e.target;
    if (value === 'EXPENSE') {
      this.expenseForm.patchValue({
        categoryId: '' + this.expenses[0].id,
      });
    } else if (value === 'INCOME') {
      this.expenseForm.patchValue({
        categoryId: '' + this.incomes[0].id,
      });
    }
  }

  onSubmitForm(e: Event) {
    e.preventDefault();
    if (this.formValidate(this.expenseForm)) {
      const { payee, amount, date, comment, categoryId } =
        this.expenseForm.value;
      const formToSend: TransactionTosend = {
        payee,
        amount,
        date,
        comment,
        category_id: categoryId,
      };

      if (this.onEdit) {
        this.transactionsService
          .updateTransaction(this.id, formToSend)
          .subscribe(
            () => {
              console.log('Data added successfully');
              this.ngZone.run(() => this.router.navigateByUrl('home'));
            },
            (err) => {
              console.log(err);
            }
          );
      } else if (!this.onEdit) {
        this.transactionsService.createTransaction(formToSend).subscribe(
          () => {
            console.log('Data added successfully');
            this.ngZone.run(() => this.router.navigateByUrl('home'));
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  handleChangeInput(name: string) {
    const newError = { ...this.errorForm, [name]: '' };
    this.errorForm = newError;
  }

  formValidate(expenseForm: FormGroup) {
    const { payee, amount, date } = expenseForm.value;

    const newError = { payee: '', amount: '', date: '' };
    let allPass = true;

    if (!payee || payee.trim() === '') {
      newError.payee = 'Payee is require!!';
      allPass = false;
    }

    if (!amount) {
      newError.amount = 'Amount is require!!';
      allPass = false;
    }

    if (isNaN(amount)) {
      newError.amount = 'Amount must be a number!!';
      allPass = false;
    }

    if (isNaN(new Date(date).getTime())) {
      newError.date = 'Date is invalid!!';
      allPass = false;
    }

    this.errorForm = newError;

    return allPass;
  }
}
