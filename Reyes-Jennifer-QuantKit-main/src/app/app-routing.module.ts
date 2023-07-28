import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { TradingComponent } from './trading/trading.component';
import { HedgingComponent } from './hedging/hedging.component';
import { RiskComponent } from './risk/risk.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'trading', component: TradingComponent},
  {path: 'hedging', component: HedgingComponent},
  {path: 'risk', component: RiskComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
