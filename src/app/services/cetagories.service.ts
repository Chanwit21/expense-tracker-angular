import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { REST_API } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class CetagoriesService {
  // Node/Epress API
  API: string = `${REST_API}/categories`;

  // Http header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}

  // Get all objects
  getAll() {
    return this.httpClient.get(`${this.API}`);
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
