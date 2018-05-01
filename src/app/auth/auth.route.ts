import { ModuleWithProviders } from '@angular/core';

import * as auth from './';
import { Routes, RouterModule } from '@angular/router';

export const route:Routes = [
    { path : 'signin', component:auth.SignInComponent,canActivate:[auth.UnAuthGuard] },
    { path : 'signup', component:auth.SignUpComponent,canActivate:[auth.UnAuthGuard] },
    { path : 'account/activate/:token', component:auth.ActivateComponent},
    { path:  'account/forgot',component:auth.ForgotComponent },
    { path:  'account/reset/:token',component:auth.ResetComponent },
];

export const AUTH_ROUTE:ModuleWithProviders = RouterModule.forChild(route);