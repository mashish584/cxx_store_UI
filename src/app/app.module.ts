import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

import * as core from './core';
import * as admin from './admin';
import * as auth from './auth';
import * as products from './products';
import * as shoppingCart from './shopping-cart'

import { APP_ROUTES } from './app.route';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ...auth.authComponents,
    ...admin.adminComponents,
    ...products.productComponents,
    ...core.coreComponents,
    ...shoppingCart.cartComponenets,
    ...core.directives
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTES,
  ],
  providers: [
    ...core.services,
    ...admin.guards,
    ...auth.guards
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
