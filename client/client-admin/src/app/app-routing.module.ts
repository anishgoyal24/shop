import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// !!!---Home---!!!
import { HomeComponent } from './home/home.component';


// !!!---Authentication---!!!
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
/**
 * Signup Component is being used in the dashboard section only
 */


// !!!---Dashboard---!!
import { DashboardComponent } from './dashboard/dashboard.component';

// Overview
import { OverviewComponent } from './dashboard/overview/overview.component';

// Stocks
import { StocksComponent } from './dashboard/stocks/stocks.component';
import { StocksHomeComponent } from './dashboard/stocks/stocks-home/stocks-home.component';
import { NewStocksComponent } from './dashboard/stocks/new-stocks/new-stocks.component';
import { ManageStocksComponent } from './dashboard/stocks/manage-stocks/manage-stocks.component';

// Products
import { ProductsComponent } from './dashboard/products/products.component';
import { ProductsHomeComponent } from './dashboard/products/products-home/products-home.component';
import { NewProductsComponent } from './dashboard/products/new-products/new-products.component';
import { ManageProductsComponent } from './dashboard/products/manage-products/manage-products.component';

// Party
import { PartyComponent } from './dashboard/party/party.component';
import { PartyHomeComponent } from './dashboard/party/party-home/party-home.component';
import { NewPartyComponent } from './dashboard/party/new-party/new-party.component';
import { ManagePartyComponent } from './dashboard/party/manage-party/manage-party.component';

// Categories
import { CategoriesComponent } from './dashboard/categories/categories.component';
import { CategoriesHomeComponent } from './dashboard/categories/categories-home/categories-home.component';
import { NewCategoriesComponent } from './dashboard/categories/new-categories/new-categories.component';
import { ManageCategoriesComponent } from './dashboard/categories/manage-categories/manage-categories.component';

// Account Administration
import { AccountComponent } from './dashboard/account/account.component';
import { AccountHomeComponent } from './dashboard/account/account-home/account-home.component';
import { NewAccountsComponent } from './dashboard/account/new-accounts/new-accounts.component';
import { ManageAccountsComponent } from './dashboard/account/manage-accounts/manage-accounts.component';
import { RolesComponent } from './dashboard/account/roles/roles.component';

// !!!----- GUARDS -----!!!
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { NavigationGuard } from 'src/shared/guards/navigation.guard';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [NavigationGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NavigationGuard] },
  { path: 'signup', component: NewAccountsComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard],
    children: [
      
      // Overview
      { path: 'overview', component: OverviewComponent },

      // Stocks
      { path: 'stocks', component: StocksComponent,
        children:[
          { path: 'home', component: StocksHomeComponent },
          { path: 'new', component: NewStocksComponent },
          { path: 'manage', component: ManageStocksComponent }
        ] 
      },

      // Products
      { path: 'products', component: ProductsComponent, 
        children: [
          { path: 'home', component: ProductsHomeComponent },
          { path: 'new', component: NewProductsComponent },
          { path: 'manage', component: ManageProductsComponent }
        ] 
      },

      // Party
      { path: 'party', component: PartyComponent, 
        children: [
          { path: 'home', component: PartyHomeComponent },
          { path: 'new', component: NewPartyComponent },
          { path: 'manage', component: ManagePartyComponent }
        ] 
      },

      // Categories
      { path: 'categories', component: CategoriesComponent, 
        children:[
          { path: 'home', component: CategoriesHomeComponent },
          { path: 'new', component: NewCategoriesComponent },
          { path: 'manage', component: ManageCategoriesComponent } ,
        ] 
      },
      
      // Account Administration
      { path: 'accounts', component: AccountComponent,
        children: [
          { path: 'home', component: AccountHomeComponent },
          { path: 'new', component: NewAccountsComponent },
          { path: 'manage', component: ManageAccountsComponent } ,
          { path: 'roles', component: RolesComponent },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
