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

import { APP_ROUTES } from './app.route';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ...auth.authComponents,
    ...admin.adminComponents,
    ...products.productComponents,
    ...core.coreComponents,
    core.CloseFlashDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTES,
  ],
  providers: [
    core.ProductService,
    core.AuthService,
    core.UserService,
    admin.AdminGuard,
    admin.AdminChildGuard,
    auth.AuthGuard,
    auth.UnAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
