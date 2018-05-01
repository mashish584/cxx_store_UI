import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as auth from './';
import { AUTH_ROUTE } from './auth.route';

@NgModule({
    declarations:[
        ...auth.authComponents
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AUTH_ROUTE
    ]
})

export class AuthModule{

}