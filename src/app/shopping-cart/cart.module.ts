import { CART_ROUTES } from './cart.route';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as shoppingCart from './'
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations:[
        ...shoppingCart.cartComponenets,
        LoaderComponent
    ],
    imports:[
        CommonModule,
        CART_ROUTES,
        FormsModule
    ]
})

export class CartModule{}