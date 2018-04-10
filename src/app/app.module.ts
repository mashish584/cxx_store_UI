
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component'

import * as core from './core';
import * as admin from './admin';
import * as auth from './auth';
import * as products from './products';

import { APP_ROUTES } from './app.route';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ...auth.authComponents,
    ...admin.adminComponents,
    ...products.productComponents,
    ...core.coreComponents
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
