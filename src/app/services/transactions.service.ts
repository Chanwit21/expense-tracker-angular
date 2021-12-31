import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { REST_API } from '../constant';
import { TransactionTosend } from '../interfaces/TransactionTosend';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  // Node/Epress API
  API: string = `${REST_API}/expense`;

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  // Get all objects
  getAll() {
    return this.httpClient.get(`${this.API}`);
  }

  getQuery(
    limit: number,
    offset: number,
    search: string,
    month: string,
    year: string
  ) {
    return this.httpClient.get(
      `${this.API}/query?limit=${limit}&offset=${offset}&search=${search}&month=${month}&year=${year}`
    );
  }

  // Get single object
  getOne(id: any) {
    return this.httpClient
      .get(`${this.API}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  // //Create
  createTransaction(data: TransactionTosend): Observable<any> {
    let API_URL = `${this.API}`;
    return this.httpClient
      .post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  //Update
  updateTransaction(id: any, data: any): Observable<any> {
    let API_URL = `${this.API}/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Delete
  deleteTransaction(id: any): Observable<any> {
    let API_URL = `${this.API}/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = err.error.message;
    } else {
      // Handle server error
      errorMessage = `Error code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(err.message);
    console.dir(err);
    return throwError(errorMessage);
  }
}
