import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import * as shoppingCart from './';
import * as auth from '../auth/guards';

export const route:Routes = [
    { path: 'cart',children:[
        {path : '',component:shoppingCart.ShoppingCartComponent},
        {path:'checkout',canActivate:[auth.AuthGuard],component:shoppingCart.CheckoutComponent}
    ]},
];

export const CART_ROUTES:ModuleWithProviders = RouterModule.forChild(route);