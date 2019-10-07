/**
 * !===== APP MODULE OF SAS CLIENT =====!
 * 
 * Please read the points below, before importing and injecting any dependencies:-
 * 1. Make sure that you document your import and if it's a part of exisiting module then import that under that 
 * particular section, otherwise make a new suitable one.
 * 2. Insert the entries under the section in lexographical order.
 */

/**
 * !===== INDEX =====!
 * 
 * 1. ANGULAR MODULES
 * 2. THIRD PARTY MODULES
 * 3. COMPONENTS
 * 4. SERVICES
 * 5. INTERCEPTORS
 * 6. CONFIG VARIABLES
 * 7. IMPORTS & DECLARATIONS
 */



/**
 * !===== 1. ANGULAR MODULES =====!
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



/**
 * !===== 2. THIRD PARTY MODULES =====!
 */
import { NgxUiLoaderModule, NgxUiLoaderConfig } from  'ngx-ui-loader';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';



/**
 * !===== 3. COMPONENTS =====!
 */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ----- HOME -----
import { HomeComponent } from './home/home.component';

// ----- AUTHENTICATION -----
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

// ----- DASHBOARD -----
import { DashboardComponent } from './dashboard/dashboard.component';

// ---- ACCOUNT -----
import { AccountComponent } from './dashboard/account/account.component';
import { AccountHomeComponent } from './dashboard/account/account-home/account-home.component';
import { AccountsHeaderComponent } from './dashboard/account/accounts-header/accounts-header.component';
import { NewAccountsComponent } from './dashboard/account/new-accounts/new-accounts.component';
import { ManageAccountsComponent } from './dashboard/account/manage-accounts/manage-accounts.component';
import { RolesComponent } from './dashboard/account/roles/roles.component';

// ----- CATEGORIES -----
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { CategoriesHeaderComponent } from './dashboard/categories/categories-header/categories-header.component';
import { CategoriesHomeComponent } from './dashboard/categories/categories-home/categories-home.component';
import { NewCategoriesComponent } from './dashboard/categories/new-categories/new-categories.component';
import { ManageCategoriesComponent } from './dashboard/categories/manage-categories/manage-categories.component';

// ----- NAVBAR -----
import { NavbarComponent } from './dashboard/navbar/navbar.component';

// ----- OVERVIEW -----
import { OverviewComponent } from './dashboard/overview/overview.component';

// ----- PRODUCTS -----
import { ProductsComponent } from './dashboard/products/products.component';
import { ProductsHeaderComponent } from './dashboard/products/products-header/products-header.component';
import { ProductsHomeComponent } from './dashboard/products/products-home/products-home.component';
import { NewProductsComponent } from './dashboard/products/new-products/new-products.component';
import { ManageProductsComponent } from './dashboard/products/manage-products/manage-products.component';

// ----- STOCKS -----
import { StocksComponent } from './dashboard/stocks/stocks.component';
import { StocksHeaderComponent } from './dashboard/stocks/stocks-header/stocks-header.component';
import { StocksHomeComponent } from './dashboard/stocks/stocks-home/stocks-home.component';
import { NewStocksComponent } from './dashboard/stocks/new-stocks/new-stocks.component';
import { ManageStocksComponent } from './dashboard/stocks/manage-stocks/manage-stocks.component';



/**
 * !===== 4. SERVICES =====!
 */
import { AdminService } from 'src/shared/services/admin.service';
import { CategoryService } from 'src/shared/services/category.service';



/**
 * !===== 5. INTERCEPTORS =====!
 */
import { AuthInterceptor } from 'src/shared/interceptors/auth.interceptor';



/**
 * !===== 6. CONFIG VARIABLES =====!
 */
import { ngxUiLoaderConfig } from 'src/shared/config/ngxUI.config';



/**
 * 7. !===== IMPORTS & DECLARATIONS =====!
 */
@NgModule({
  declarations: [
    // APP COMPONENT
    AppComponent,

    // AUTHENTICATION COMPONENTS
    LoginComponent,
    SignupComponent,

    // HOME COMPONENT
    HomeComponent,

    // DASHBOARD COMPONENTS
    DashboardComponent,
    NavbarComponent,
    OverviewComponent,
    StocksComponent,
    ProductsComponent,
    CategoriesComponent,
    AccountComponent,

    // ACCOUNT COMPONENTS
    AccountsHeaderComponent,
    NewAccountsComponent,
    ManageAccountsComponent,
    RolesComponent,
    AccountHomeComponent,

    // CATEGORIES COMPONENTS
    CategoriesHeaderComponent,
    CategoriesHomeComponent,
    NewCategoriesComponent,
    ManageCategoriesComponent,

    // PRODUCTS COMPONENTS
    ProductsHeaderComponent,
    NewProductsComponent,
    ManageProductsComponent,
    ProductsHomeComponent,
    
    // STOCKS COMPONENTS
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
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SnotifyModule
  ],
  providers: [
    AdminService,
    CategoryService,
    SnotifyService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
