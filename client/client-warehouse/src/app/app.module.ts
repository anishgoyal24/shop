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


import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StocksComponent } from './dashboard/stocks/stocks.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { AddStockComponent } from './dashboard/stocks/add-stock/add-stock.component';
import { StocksHeaderComponent } from './dashboard/stocks/stocks-header/stocks-header.component';
import { StocksHomeComponent } from './dashboard/stocks/stocks-home/stocks-home.component';
import { ManageStockComponent } from './dashboard/stocks/manage-stock/manage-stock.component';
import { StockItemComponent } from './dashboard/stocks/manage-stock/stock-item/stock-item.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { OrderHeaderComponent } from './dashboard/orders/order-header/order-header.component';
import { OrderHomeComponent } from './dashboard/orders/order-home/order-home.component';
import { ManageOrderComponent } from './dashboard/orders/manage-order/manage-order.component';
import { OrderItemComponent } from './dashboard/orders/manage-order/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    
    // AUTHENTICATION COMPONENTS
    LoginComponent,
    SignupComponent,

    HomeComponent,

    NavbarComponent,

    DashboardComponent,

    StocksComponent,

    OverviewComponent,

    AddStockComponent,

    StocksHeaderComponent,

    StocksHomeComponent,

    ManageStockComponent,

    StockItemComponent,

    OrdersComponent,

    OrderHeaderComponent,

    OrderHomeComponent,

    ManageOrderComponent,

    OrderItemComponent
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
