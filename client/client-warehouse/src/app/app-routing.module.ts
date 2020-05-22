import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// !!!---Home---!!!
import { HomeComponent } from './home/home.component';

// !!!---Authentication---!!!
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

// !!!---Dashboard---!!
import { DashboardComponent } from './dashboard/dashboard.component';

// !!!---Overview---!!
import { OverviewComponent } from './dashboard/overview/overview.component';

// !!!---Stocks---!!!
import { StocksComponent } from './dashboard/stocks/stocks.component';
import { StocksHomeComponent } from './dashboard/stocks/stocks-home/stocks-home.component';
import { AddStockComponent } from './dashboard/stocks/add-stock/add-stock.component';
import { ManageStockComponent } from './dashboard/stocks/manage-stock/manage-stock.component';

// !!!---Orders---!!!
import { OrdersComponent } from './dashboard/orders/orders.component';
import { OrderHomeComponent } from './dashboard/orders/order-home/order-home.component';
import { ManageOrderComponent } from './dashboard/orders/manage-order/manage-order.component';
import { OpenOrdersComponent } from './dashboard/orders/open-orders/open-orders.component';
import { TransferOrderComponent } from './dashboard/orders/transfer-order/transfer-order.component';
import { AddOrderComponent } from './dashboard/orders/add-order/add-order.component';


// !!!---Change Password---!!!
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';

// !!!----- GUARDS -----!!!
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { NavigationGuard } from 'src/shared/guards/navigation.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [NavigationGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NavigationGuard] },
  { path: 'signup', component: SignupComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], 
    children: [

      //Overview
      { path: 'overview', component: OverviewComponent },

      //Stocks
      { path: 'stock', component: StocksComponent,
        children: [
          { path: 'home', component: StocksHomeComponent },
          { path: 'add', component: AddStockComponent },
          { path: 'manage', component: ManageStockComponent }
        ]
    },

    // Orders
    { path: 'orders', component: OrdersComponent,
      children: [
        { path: 'home', component: OrderHomeComponent },
        { path: 'manage', component: ManageOrderComponent },
        { path: 'open', component: OpenOrdersComponent },
        { path: 'transfer/:orderId', component: TransferOrderComponent },
        { path: 'transfer', component: TransferOrderComponent },
        { path: 'add', component: AddOrderComponent }
      ]
  },

  // Change password
    { path: 'change-password', component: ChangePasswordComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
