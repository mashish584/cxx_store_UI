import { Component, OnInit } from '@angular/core';

import { ProductService, CartService, UtilsService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent implements OnInit {
  products;
  featured;

  // stars tracking
  fullStars = [];
  halfStars = [];
  noStars = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    this.cartService.getCart();
    this.productService.getRandomProducts(12).subscribe(
      (data: any) => {
        let { products } = data.body;
        this.products = products;
        this.featured = products[Math.floor(Math.random() * products.length)];
        // Calculating Stars
        this.utilService.resetStars();
        this.products.map((product, index) =>
          this.calculateStars(product, index)
        );
      },
      (error: any) => {
        alert('Something went wrong');
      }
    );
  }

  /*
    >=> Add Product to cart
  */
  addToCart(product) {
    product = {
      id: product._id,
      title: product.productTitle,
      price: product.productPrice,
      image: product.productImg,
      qty: 1,
    };
    this.cartService.addProductToCart(product);
  }

  /*
    >=> Get average and count half
    >=> and full stars
 */
  calculateStars(product, index) {
    [
      this.fullStars,
      this.halfStars,
      this.noStars,
    ] = this.utilService.calculateProductStars(product, index);
  }
}
