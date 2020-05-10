import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// !!!---Home---!!!
import { HomeComponent } from './home/home.component';

// !!!---Authentication---!!!
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

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

import { ResetPasswordComponent } from './dashboard/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent,
    children: [

      // Products
      { path: 'products', component: ProductsComponent },

      //  Cart
      { path: 'cart', component: CartComponent },

      // Checkout
      { path: 'checkout', component: CheckoutComponent },

      // Orders
      { path: 'orders', component: OrdersComponent },

      // Change Password
      { path: 'change-password', component: ResetPasswordComponent },

      // Account Details
      { path: 'details', component: AccountDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
