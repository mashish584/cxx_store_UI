import { PRODUCT_ROUTES } from './products.route';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as products from './';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        ...products.productComponents,
    ],
    imports:[
        FormsModule,
        CommonModule,
        PRODUCT_ROUTES,
    ]
})

export class ProductsModule{}