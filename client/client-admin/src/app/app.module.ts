import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgxUiLoaderModule, NgxUiLoaderConfig } from  'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { StocksComponent } from './dashboard/stocks/stocks.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { AccountComponent } from './dashboard/account/account.component';
import { AccountsHeaderComponent } from './dashboard/account/accounts-header/accounts-header.component';
import { NewAccountsComponent } from './dashboard/account/new-accounts/new-accounts.component';
import { ManageAccountsComponent } from './dashboard/account/manage-accounts/manage-accounts.component';
import { RolesComponent } from './dashboard/account/roles/roles.component';
import { AccountHomeComponent } from './dashboard/account/account-home/account-home.component';
import { CategoriesHeaderComponent } from './dashboard/categories/categories-header/categories-header.component';
import { CategoriesHomeComponent } from './dashboard/categories/categories-home/categories-home.component';
import { NewCategoriesComponent } from './dashboard/categories/new-categories/new-categories.component';
import { ManageCategoriesComponent } from './dashboard/categories/manage-categories/manage-categories.component';
import { ProductsHeaderComponent } from './dashboard/products/products-header/products-header.component';
import { NewProductsComponent } from './dashboard/products/new-products/new-products.component';
import { ManageProductsComponent } from './dashboard/products/manage-products/manage-products.component';
import { ProductsHomeComponent } from './dashboard/products/products-home/products-home.component';
import { StocksHeaderComponent } from './dashboard/stocks/stocks-header/stocks-header.component';
import { NewStocksComponent } from './dashboard/stocks/new-stocks/new-stocks.component';
import { ManageStocksComponent } from './dashboard/stocks/manage-stocks/manage-stocks.component';
import { StocksHomeComponent } from './dashboard/stocks/stocks-home/stocks-home.component';

const colors: any = ["#fa7c30", "#fdcd3b", "#53e3a6", "#28c3d4"]

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {

  //"bgsColor": colors[getRandomInt(0, colors.length-1)],
  "bgsColor": colors[0],
  "bgsOpacity": 0.9,
  "bgsPosition": "center-center",
  "bgsSize": 100,
  "bgsType": "three-bounce",
  "blur": 15,
  "fgsColor": "#000",
  "fgsPosition": "center-center",
  "fgsSize": 100,
  "fgsType": "fading-circle",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  //"overlayColor": colors[getRandomInt(0, colors.length)],
  "overlayColor": colors[3],
  "pbColor": "#fff",
  "pbDirection": "ltr",
  "pbThickness": 5,
  "hasProgressBar": false,
  "text": "Please Hold on...",
  "textColor": "#000000",
  "textPosition": "center-center"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent,
    NavbarComponent,
    OverviewComponent,
    StocksComponent,
    ProductsComponent,
    CategoriesComponent,
    AccountComponent,
    AccountsHeaderComponent,
    NewAccountsComponent,
    ManageAccountsComponent,
    RolesComponent,
    AccountHomeComponent,
    CategoriesHeaderComponent,
    CategoriesHomeComponent,
    NewCategoriesComponent,
    ManageCategoriesComponent,
    ProductsHeaderComponent,
    NewProductsComponent,
    ManageProductsComponent,
    ProductsHomeComponent,
    StocksHeaderComponent,
    NewStocksComponent,
    ManageStocksComponent,
    StocksHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
