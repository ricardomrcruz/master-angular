import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishItem } from '../../shared/models/whishItem';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishService {
  constructor(private http: HttpClient) {}

  private getStandardOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
  }

  getWishes() {
    let options = this.getStandardOptions();

    options.params = new HttpParams({
      fromObject: { format: 'json' },
    });

    return this.http
      .get('/assets/wishes.json', options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error(`Network or client error ${error}`);
    } else {
      console.error(`Server-side error:`, error.error);
    }

    return throwError(
      () =>
        new Error('Cannot retrieve wishes from the server. Please try again.')
    );
  }

  addWish(wish: WishItem) {
    let options = this.getStandardOptions();

    options.headers = options.headers.set(
      'Authorization',
      'value-need-for-authorization'
    );

    this.http.post('assets/wishes.json', options);
  }
}
