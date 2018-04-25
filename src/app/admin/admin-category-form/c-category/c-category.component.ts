import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';


@Component({
    selector:'child-category',
    templateUrl:'./c-category.component.html'
})

export class ChildCategory implements OnInit,OnDestroy{

    // Binding input's here in these three variables
    // with ngModel
    private name:String;
    private type:String = "child";
    private parent:String = "";

    //Storing all categories from services
    //and child categories also for list
    private categories:Category[];
    private c_categories:Category[];

    private subscription:Subscription;

    constructor(private productService:ProductService){
        // Subscribing child category update notification
        // for updating the current state of categories
        // by pushing new data
        this.subscription = productService.c_categoryUpdate.subscribe(data => {
            this.c_categories.push(data);
            productService.categories = this.categories.map(category => {
                if(category.name === data.parent){
                    // pushing child category data by finding the
                    // correct parent
                    if(!category.childs[0]){
                       category.childs[0] = data;
                    }else{
                        category.childs.push(data);
                    }
                }
                return category;
            });
            productService.sub_menuUpdate.next();
        });
    }

    ngOnInit(){
        // populating categories and child categories
        // whenever component get initialized
        this.categories = this.productService.categories;
        this.c_categories = this.productService.c_categories;
    }

    ngOnDestroy(){
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    // Making an call to ProductService StoreProductCategory methods
    // for storing the data user requested
    private addCategory(){
        //creating a brand new category object
        let data:Category = {name:this.name,type:this.type,parent:this.parent,childs:[{}]};
        // sending a request to productService save category method
        // for saving category on server
        this.productService.storeProductCategory(data)
            .subscribe(
                (data:any) => {
                    let {message} = data.body;
                    // show success alert
                    alert(message);
                    this.name = "";
                },
                (error:any) => {
                    let {message} = error.error;
                    //show error alert
                    alert(message || "Server is not responding.");
                }
             );
     }

}