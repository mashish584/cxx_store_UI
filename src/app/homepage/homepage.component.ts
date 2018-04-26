import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/services/products.service';
import { CartService } from '../core/services/cart.service';


@Component({
    selector: 'app-home',
    templateUrl: './homepage.component.html'
})

export class HomepageComponent implements OnInit{

    products;

    constructor(private productService:ProductService,private cartService:CartService){}

    ngOnInit(){
        this.cartService.getCart();
        this.productService.getRandomProducts()
            .subscribe(
                (data:any) => {
                    let {products} = data.body;
                    this.products = products;
                },
                (error:any) => {
                   alert("Something went wrong");
                }
            );
    }

    addToCart(product){
        product = {id:product._id,title:product.productTitle,price:product.productPrice,image:product.productImg,qty:1};
        this.cartService.addProductToCart(product);
    }


}