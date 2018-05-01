import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import * as products from './';
import { HomepageComponent } from '../homepage/homepage.component'

export const route:Routes = [
    { path : 'products',children:[
        { path:'', component:HomepageComponent },
        { path: ':id', component:products.SingleProduct },
        { path: 'category/:name', component:products.ProductList }
    ]},
];

export const PRODUCT_ROUTES:ModuleWithProviders = RouterModule.forChild(route);