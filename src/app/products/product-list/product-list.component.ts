import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductService, CartService, UtilsService } from '../../core/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductList implements OnInit {
  products: any[];
  title: String;
  child: boolean;

  // stars tracking
  fullStars = [];
  halfStars = [];
  noStars = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private utilService: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // checking type of category with query params
    this.route.queryParams.subscribe(
      params => (this.child = params.child || false)
    );

    this.route.params.subscribe((params: Params) => {
      this.title = params.name;
      // send requet to product category else to child category
      // depend on child query Params
      let $products = this.child
        ? this.productService.getProductsBySubCategory(this.title)
        : this.productService.getProductsByParentCategory(this.title);

      $products.subscribe(
        (data: any) => {
          let { products } = data.body;
          this.products = products;
          // Calculating Stars
          this.utilService.resetStars();
          this.products.map((product, index) =>
            this.calculateStars(product, index)
          );
        },
        (error: any) => {
          alert('Something went wrong');
          this.router.navigateByUrl('');
        }
      );
    });
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
