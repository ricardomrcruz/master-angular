import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishItem } from '../shared/models/whishItem';

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

    return this.http.get('/assets/wishes.json', options);
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
