import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { SharedComponent } from './shared/shared.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'shared', component: SharedComponent, children: [
      // { path: '', redirectTo: 'attendance', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recruitment', component: RecruitmentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

