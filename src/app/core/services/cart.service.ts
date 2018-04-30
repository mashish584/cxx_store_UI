import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartService {
  private shoppingCart: any[] = [];
  private count: Number = 0;
  private cartTotal: Number = 0;

  cartUpdate: Subject<any> = new Subject<any>();

  /*
        >=> Add Product to Cart
    */

  addProductToCart(product) {
    let cartItems = this.shoppingCart;
    if (cartItems.length === 0) {
      localStorage.setItem('cart', JSON.stringify([product]));
    } else {
      let itemExist = cartItems.findIndex(item => item.id === product.id);
      itemExist != -1 ? cartItems[itemExist].qty++ : cartItems.push(product);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // Notify Observer
    this.cartUpdate.next(this.getCart());
  }

  /*
        >=> Updating product quantity
     */

  updateProduct(id, qty) {
    this.shoppingCart.map(item => {
      if (item.id === id) {
        item.qty = qty;
      }
    });

    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    // Notify Observer
    this.cartUpdate.next(this.getCart());
  }

  /*
        >=> Removing product from cart
     */

  removeProductFromCart(id: String) {
    this.shoppingCart = this.shoppingCart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    // Notify Observer
    this.cartUpdate.next(this.getCart());
  }

  /*
        >=> Calculating number of products we have in a cart
    */

  private setCount() {
    this.count = this.shoppingCart.length;
  }

  /*
        >=> Calculating cart total by using reduce()
    */

  private setCartTotal() {
    let cartItems = this.shoppingCart;
    this.cartTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  /*
        >=> Storing a cart from localStorage in
        >=> shoppingCart propery and also calculating
        >=> cart total and count
    */

  getCart() {
    this.shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setCartTotal();
    this.setCount();
    return {
      items: this.shoppingCart,
      total: this.cartTotal,
      count: this.count,
    };
  }
}
