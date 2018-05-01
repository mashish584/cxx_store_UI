import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import * as admin from './';

export const routes:Routes = [
    { path: 'admin', component: admin.AdminComponent, canActivate:[admin.AdminGuard], canActivateChild:[admin.AdminChildGuard], children:[
        { path:'', component:admin.AdminHome },
        { path:'product/add', component:admin.AdminProductForm },
        { path:'product/update/:id',component:admin.AdminProductForm },
        { path:'category/add', component:admin.AdminCategoryForm },
        { path:'products', component:admin.AdminProductsComponent },
        { path:'users', component: admin.AdminUsersComponent },
        { path:'orders', component: admin.AdminOrdersComponent }
    ]}
];

export const ADMIN_ROUTES:ModuleWithProviders = RouterModule.forChild(routes);