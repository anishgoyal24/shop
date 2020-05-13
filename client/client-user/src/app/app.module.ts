import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ngxUiLoaderConfig } from 'src/shared/config/ngxUI.config';

import { AuthInterceptor } from 'src/shared/interceptors/auth.interceptor';

import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// ----- HOME -----
import { HomeComponent } from './home/home.component';

// ----- AUTHENTICATION -----
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

// ----- DASHBOARD -----
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { ProductItemComponent } from './dashboard/products/product-item/product-item.component';
import { ProductsListComponent } from './dashboard/products/products-list/products-list.component';
import { CartComponent } from './dashboard/cart/cart.component';
import { CartItemComponent } from './dashboard/cart/cart-item/cart-item.component';
import { CheckoutComponent } from './dashboard/checkout/checkout.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { OrderItemComponent } from './dashboard/orders/order-item/order-item.component';
import { AccountDetailsComponent } from './dashboard/account-details/account-details.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    
    // AUTHENTICATION COMPONENTS
    LoginComponent,
    SignupComponent,

    HomeComponent,

    DashboardComponent,

    NavbarComponent,

    ProductsComponent,

    ProductItemComponent,

    ProductsListComponent,

    CartComponent,

    CartItemComponent,

    CheckoutComponent,

    OrdersComponent,

    OrderItemComponent,

    AccountDetailsComponent,

    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SnotifyModule,
    NgbModalModule,
  ],
  providers: [
    SnotifyService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
