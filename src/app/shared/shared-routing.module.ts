import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedComponent } from './shared.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { RecruitmentComponent } from '../features/recruitment/recruitment.component';

const routes: Routes = [
  {
    path: 'shared',
    component: SharedComponent,
    children: [
      // { path: '', redirectTo: 'attendance', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recruitment', component: RecruitmentComponent },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SharedRoutingModule { }
