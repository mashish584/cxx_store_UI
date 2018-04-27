import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../core/services';


@Component({
    selector:'app-single-product',
    templateUrl:'./single-product.component.html'
})

export class SingleProduct implements OnInit,AfterViewInit{

    product;
    featureTypes:String[] = [];
    featureValues:String[]= [];


    constructor(private router:Router,private route:ActivatedRoute,private productService:ProductService){}

    ngOnInit(){
        this.route.params
            .subscribe((params:Params) => {
                let {id} = params;
                this.productService.getProduct(id)
                    .subscribe(
                        (data:any) => {
                            let {product} = data.body;
                            let features = JSON.parse(product.productFeatures);
                            this.product = product;
                            Object.keys(features).map(key => {
                                this.featureTypes.push(key);
                                this.featureValues.push(features[key]);
                            });
                        },
                        (error:any) => {
                            alert("Something went wrong");
                            this.router.navigateByUrl('');
                        }
                    );
            });
    }

    ngAfterViewInit(){
        // window.scrollTo(0,0);
    }

}