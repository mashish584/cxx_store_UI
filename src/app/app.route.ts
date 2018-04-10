import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component'

import * as admin from './admin';
import * as auth from './auth';
import * as products from './products';

export const ROUTES:Routes = [
    { path : '', component:HomepageComponent },
    { path : 'signin', component:auth.SignInComponent },
    { path : 'signup', component:auth.SignUpComponent },
    { path: 'admin', component: admin.AdminComponent, children:[
        { path:'', component:admin.AdminHome },
        { path:'product/add', component:admin.AdminProductForm },
        { path:'category/add', component:admin.AdminCategoryForm }
    ]},
    { path : 'products',children:[
        { path :'', component:HomepageComponent },
        { path: ':id', component:products.SingleProduct },
        { path: 'category/:id', component:products.ProductList }
    ]},
    { path:'**', redirectTo:'', pathMatch:'full' }
];

export const APP_ROUTES:ModuleWithProviders = RouterModule.forRoot(ROUTES);
