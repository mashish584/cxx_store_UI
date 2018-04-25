import { AdminProductForm } from './admin/admin-product-form/admin-product-form.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component'

import * as admin from './admin';
import * as auth from './auth';
import * as products from './products';

export const ROUTES:Routes = [
    { path : '', component:HomepageComponent },
    { path : 'signin', component:auth.SignInComponent,canActivate:[auth.UnAuthGuard] },
    { path : 'signup', component:auth.SignUpComponent,canActivate:[auth.UnAuthGuard] },
    { path : 'account/activate/:token', component:auth.ActivateComponent},
    { path:  'account/forgot',component:auth.ForgotComponent },
    { path:  'account/reset/:token',component:auth.ResetComponent },
    { path: 'admin', component: admin.AdminComponent, canActivate:[admin.AdminGuard], canActivateChild:[admin.AdminChildGuard], children:[
        { path:'', component:admin.AdminHome },
        { path:'product/add', component:admin.AdminProductForm },
        { path:'product/update/:id',component:admin.AdminProductForm },
        { path:'category/add', component:admin.AdminCategoryForm },
        { path:'products', component:admin.AdminProductsComponent },
        { path:'users', component: admin.AdminUsersComponent }
    ]},
    { path : 'products',children:[
        { path :'', component:HomepageComponent },
        { path: ':id', component:products.SingleProduct },
        { path: 'category/:id', component:products.ProductList }
    ]},
    { path:'**', redirectTo:'', pathMatch:'full' }
];

export const APP_ROUTES:ModuleWithProviders = RouterModule.forRoot(ROUTES);
