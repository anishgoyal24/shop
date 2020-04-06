import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// !!!---Home---!!!
import { HomeComponent } from './home/home.component';

// !!!---Authentication---!!!
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

// !!!---Dashboard---!!
import { DashboardComponent } from './dashboard/dashboard.component';

// !!!---Overview---!!
import { OverviewComponent } from './dashboard/overview/overview.component';

// !!!---Stocks---!!!
import { StocksComponent } from './dashboard/stocks/stocks.component';

// // !!!----- GUARDS -----!!!
// import { AuthGuard } from 'src/shared/guards/auth.guard';
// import { NavigationGuard } from 'src/shared/guards/navigation.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent, 
    children: [

      //Overview
      { path: 'overview', component: OverviewComponent },

      //Stocks
      { path: 'stocks', component: StocksComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
