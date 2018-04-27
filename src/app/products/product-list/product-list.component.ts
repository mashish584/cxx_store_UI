import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../core/services';

@Component({
    selector:'app-product-list',
    templateUrl:'./product-list.component.html'
})

export class ProductList implements OnInit{

    products:any[];
    title:String;
    child:boolean;

    constructor(private productService:ProductService,private route:ActivatedRoute,private router:Router){}

    ngOnInit(){

        // checking type of category with query params
        this.route.queryParams
            .subscribe(params => (this.child = params.child || false));

        this.route.params
            .subscribe(
                (params:Params) => {
                    this.title  = params.name;
                    let $products =
                                this.child ?
                                        this.productService.getProductsBySubCategory(this.title)
                                        :this.productService.getProductsByParentCategory(this.title);
                    $products.subscribe(
                        (data:any) => {
                            let {products} = data.body;
                            this.products = products;
                        },
                        (error:any) => {
                            alert('Something went wrong');
                            this.router.navigateByUrl('');
                        }
                    );
                }
            );
    }

}