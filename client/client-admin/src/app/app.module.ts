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
 * 6. GUARDS
 * 7. CONFIG VARIABLES
 * 8. IMPORTS & DECLARATIONS
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
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



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

// ----- PARTY -----
import { PartyComponent } from './dashboard/party/party.component';
import { PartyHeaderComponent } from './dashboard/party/party-header/party-header.component';
import { PartyHomeComponent } from './dashboard/party/party-home/party-home.component';
import { NewPartyComponent } from './dashboard/party/new-party/new-party.component';
import { ManagePartyComponent } from './dashboard/party/manage-party/manage-party.component';

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
import { AuthService } from 'src/shared/services/auth.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { ProductService } from 'src/shared/services/product.service';
import { PartyService } from 'src/shared/services/party.service';


/**
 * !===== 5. INTERCEPTORS =====!
 */
import { AuthInterceptor } from 'src/shared/interceptors/auth.interceptor';



/**
 * !===== 6. GUARDS =====!
 */
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { NavigationGuard } from 'src/shared/guards/navigation.guard';



/**
 * !===== 7. CONFIG VARIABLES =====!
 */
import { ngxUiLoaderConfig } from 'src/shared/config/ngxUI.config';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { PartyAdminComponent } from './dashboard/party-admin/party-admin.component';
import { PartyNewCustomerComponent } from './dashboard/party-admin/party-new-customer/party-new-customer.component';
import { PartyManageCustomerComponent } from './dashboard/party-admin/party-manage-customer/party-manage-customer.component';
import { PartyAdminHomeComponent } from './dashboard/party-admin/party-admin-home/party-admin-home.component';
import { PartyAdminHeaderComponent } from './dashboard/party-admin/party-admin-header/party-admin-header.component';
import { WarehouseComponent } from './dashboard/warehouse/warehouse.component';
import { WarehouseHomeComponent } from './dashboard/warehouse/warehouse-home/warehouse-home.component';
import { WarehouseHeaderComponent } from './dashboard/warehouse/warehouse-header/warehouse-header.component';
import { ManageWarehouseComponent } from './dashboard/warehouse/manage-warehouse/manage-warehouse.component';
import { NewWarehouseComponent } from './dashboard/warehouse/new-warehouse/new-warehouse.component';
import { ManageSectionComponent } from './common/manage-section/manage-section.component';



/**
 * 8. !===== IMPORTS & DECLARATIONS =====!
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
    StocksHomeComponent,

    // PARTY COMPONENTS
    PartyHomeComponent,
    PartyHeaderComponent,
    NewPartyComponent,
    ManagePartyComponent,
    PartyComponent,
    LoadingSpinnerComponent,
    PartyAdminComponent,
    PartyNewCustomerComponent,
    PartyManageCustomerComponent,
    PartyAdminHomeComponent,
    PartyAdminHeaderComponent,
    WarehouseComponent,
    WarehouseHomeComponent,
    WarehouseHeaderComponent,
    ManageWarehouseComponent,
    NewWarehouseComponent,
    ManageSectionComponent
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
    AdminService,
    CategoryService,
    SnotifyService,
    AuthService,
    UtilityService,
    ProductService,
    PartyService,
    AuthGuard,
    NavigationGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
