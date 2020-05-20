import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// !!!---Home---!!!
import { HomeComponent } from './home/home.component';

// !!!---Authentication---!!!
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';

// !!!---Dashboard---!!!
import { DashboardComponent } from './dashboard/dashboard.component';

// !!!---Products---!!!
import { ProductsComponent } from './dashboard/products/products.component';

// !!!---Cart---!!!
import { CartComponent } from './dashboard/cart/cart.component';

// !!!---Checkout---!!!
import { CheckoutComponent } from './dashboard/checkout/checkout.component';

// !!!---Orders---!!!
import { OrdersComponent } from './dashboard/orders/orders.component';

// !!!---Account Details---!!!
import { AccountDetailsComponent } from './dashboard/account-details/account-details.component';

// !!!---Change Password---!!!
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';

import { NotificationComponent } from './dashboard/notification/notification.component';

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

      // Products
      { path: 'products', component: ProductsComponent },

      //  Cart
      { path: 'cart', component: CartComponent },

      // Checkout
      { path: 'checkout', component: CheckoutComponent },

      // Orders
      { path: 'orders', component: OrdersComponent },

      // Account Details
      { path: 'details', component: AccountDetailsComponent },

      // Change Password
      { path: 'change-password', component: ChangePasswordComponent },

      // Notification
      { path: 'notifications', component: NotificationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
