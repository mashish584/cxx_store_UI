import { ProductService } from './../core/services/products.service';
import { CartService } from './../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public cart;

  constructor(
    public cartService: CartService,
    public productService: ProductService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartService.cartUpdate.subscribe(
      data => (this.cart = this.cartService.getCart())
    );
  }

  // remove item from cart
  removeItem(id) {
    this.cartService.removeProductFromCart(id);
  }

  /*
    >=> Update the quantity of cart product
  */
  updateQuantity(id, $event) {
    let qty = $event.target.value;
    this.productService.getProduct(id).subscribe(
      (data: any) => {
        const { product } = data.body;
        if (product.productQty < qty) {
          alert(`Only ${product.productQty} product quantity is available.`);
          qty = product.productQty;
        }
        this.cartService.updateProduct(id, qty);
      },
      (error: any) => {
        alert('Something went wrong');
      }
    );
  }

  // navigate user to checkout route
  doCheckout() {
    this.router.navigate(['checkout'], { relativeTo: this.route });
  }
}
