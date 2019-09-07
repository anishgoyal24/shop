import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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

const colors: any = ["#fa7c30", "#fdcd3b", "#53e3a6", "#28c3d4"]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {

  "bgsColor": colors[getRandomInt(0, colors.length-1)],
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
  "overlayColor": colors[getRandomInt(0, colors.length)],
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
    RolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
