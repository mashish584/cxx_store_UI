import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService,CartService,ProductService } from './../services';


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit,OnDestroy{

    // tracking user status
    //isLoggedIn or isAdmin
    isLoggedIn:boolean;
    isAdmin:boolean;

    // store categories
    categories:Category[];

    // count items in cart
    countCart:Number = 0;

    // storing subscription
    subscription:Subscription;

    constructor(private authService:AuthService,private productService:ProductService,private cartService:CartService,private route:ActivatedRoute){
        this.countCart = this.cartService.getCart().count;
        this.cartService.cartUpdate
            .subscribe((data) =>(this.countCart = this.cartService.getCart().count));
    }

    ngOnInit(){
        this.categories = this.productService.categories;
        // loadCategories from productService
        this.productService.sub_menuUpdate.subscribe(() => {
            this.categories = this.productService.categories;
        });

        // update navigation based on
        // user status and role
        this.updateNav();

        // subscribig to navigation subject
        // if there is any change in user status
        // made like login or logout
        this.authService.NavSubject
            .subscribe(() => {
                this.updateNav();
            });
    }

    ngOnDestroy(){
        if(this.subscription) this.subscription.unsubscribe();
    }

    // Updating LoggedIn and isAdmin property
    // by subscribing to notification of navigation
    // subject
    private updateNav(){
        this.isLoggedIn = this.authService.isLoggedIn();
        this.subscription = this.authService.isAdmin()
            .subscribe((value:{isAdmin:boolean}) => {
                this.isAdmin = value.isAdmin;
            });
    }

    // remove user token and updating
    // navigation subject notification
    // for navigation items
    private signOut(){
        localStorage.removeItem('authUser');
        this.authService.NavSubject.next();
    }

}