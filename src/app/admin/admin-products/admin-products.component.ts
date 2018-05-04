import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, UserService } from '../../core/services';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnInit {
  public products;

  constructor(
    public productService: ProductService,
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        let { products } = data.body;
        this.products = products;
      },
      (error: any) => {
        alert('Something went wrong');
      }
    );
  }

  public updateProduct(id) {
    this.router.navigate(['../product/update', id], { relativeTo: this.route });
  }
}
