import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './feature/login/login.component';

import { SharedComponent } from './shared/shared.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { RecruitmentComponent } from './feature/recruitment/recruitment.component';


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

