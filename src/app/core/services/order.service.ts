import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class OrderService {
  orderUpdate = new Subject<any>();

  constructor(private http: HttpClient) {}

  /*
        >=> get all orders
    */

  getOrders() {
    return this.http.get<any>('http://localhost:8080/api/orders', {
      observe: 'response',
    });
  }
}
