import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, UserService } from '../../core/services';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnInit {
  private products;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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

  private updateProduct(id) {
    this.router.navigate(['../product/update', id], { relativeTo: this.route });
  }
}
