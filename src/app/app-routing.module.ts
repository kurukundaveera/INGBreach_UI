import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreachSubmitComponent } from './breach-submit/breach-submit.component'
import { LoginComponent } from './login/login.component';
import { HighRiskComponent } from './high-risk/high-risk.component'
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'breach-form', component: BreachSubmitComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
