import { ProductService } from './../core/services/products.service';
import { CartService } from './../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private cart;

  constructor(private cartService:CartService,private productService:ProductService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
     this.cart = this.cartService.getCart();
     this.cartService.cartUpdate
         .subscribe(data => (this.cart = this.cartService.getCart()))
  }

  removeItem(id){
    this.cartService.removeProductFromCart(id);
  }

  updateQuantity(id,$event){
    let qty = $event.target.value;
    this.productService.getProduct(id)
        .subscribe(
          (data:any) => {
            let {product} = data.body;
            if(product.productQty < qty){
              alert(`Only ${product.productQty} product quantity is available.`);
              qty = product.productQty;
            }
            this.cartService.updateProduct(id,qty);
          },
          (error:any) => {
            alert("Something went wrong");
          }
        );
  }

  doCheckout(){
    this.router.navigate(['checkout'],{relativeTo:this.route})
  }

}