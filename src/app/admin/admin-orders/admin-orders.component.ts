import { OrderService } from './../../core/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
})
export class AdminOrdersComponent implements OnInit {
  public orders;

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      (data: any) => {
        let { orders } = data.body;
        this.orders = orders;
      },
      (error: any) => {
        alert('Something went wrong');
      }
    );
  }
}
