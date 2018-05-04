import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ADMIN_ROUTES } from './admin.route';
import { AdminService } from './services';

import * as admin from './';

@NgModule({
    declarations:[
        ...admin.adminComponents,
    ],
    imports:[
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ADMIN_ROUTES
    ],
    providers:[AdminService],
    exports:[
        ReactiveFormsModule,
        FormsModule
    ]
})

export class AdminModule{}