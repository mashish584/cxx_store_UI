
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class CartService{

    private shoppingCart:any[] = [];
    private count:Number = 0;
    private cartTotal:Number = 0;

    cartUpdate:Subject<any> = new Subject<any>();


    addProductToCart(product){
        let cartItems = this.shoppingCart;
        if(cartItems.length === 0){
            localStorage.setItem('cart',JSON.stringify([product]));
        }else{
            let itemExist = cartItems.findIndex(item => item.id === product.id);
            itemExist != -1 ? cartItems[itemExist].qty++ : cartItems.push(product);
            localStorage.setItem('cart',JSON.stringify(cartItems));
        }

        // Notify Observer
        this.cartUpdate.next(this.getCart());
    }


    updateProduct(id,qty){
        this.shoppingCart.map(item => {
            console.log(item.id === id);
            if(item.id === id){
                item.qty = qty;
            }
        });

        localStorage.setItem('cart',JSON.stringify(this.shoppingCart));
        // Notify Observer
        this.cartUpdate.next(this.getCart());
    }

    removeProductFromCart(id:String){
        this.shoppingCart = this.shoppingCart.filter(item => item.id != id);
        localStorage.setItem('cart',JSON.stringify(this.shoppingCart));
        // Notify Observer
        this.cartUpdate.next(this.getCart());
    }


    private setCount(){
        this.count = this.shoppingCart.length;
    }

    private setCartTotal(){
           let cartItems = this.shoppingCart;
           this.cartTotal = cartItems.reduce((sum,item) => sum+item.price*item.qty,0);
    }

    getCart(){
        this.shoppingCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.setCartTotal();
        this.setCount();
        return {items:this.shoppingCart,total:this.cartTotal,count:this.count};
    }

}