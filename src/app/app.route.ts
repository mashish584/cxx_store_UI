import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component'


export const ROUTES:Routes = [
    { path : '', component:HomepageComponent },
    { path:'**', redirectTo:'', pathMatch:'full' }
];

export const APP_ROUTES:ModuleWithProviders = RouterModule.forRoot(ROUTES);
