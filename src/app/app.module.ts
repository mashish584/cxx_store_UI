import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

// Feature Modules Imports
import { CartModule } from './shopping-cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';

import * as admin from './admin/guards';
import * as auth from './auth/guards';
import * as core from './core';

import { APP_ROUTES } from './app.route';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ...core.coreComponents,
    ...core.directives,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTES,
    AdminModule,
    AuthModule,
    ProductsModule,
    CartModule
  ],
  providers: [
    ...core.services,
    ...admin.guards,
    ...auth.guards
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
