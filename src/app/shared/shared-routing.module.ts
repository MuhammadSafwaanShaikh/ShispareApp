import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponent } from './shared.component';
import { DesignationComponent } from '../features/designation/designation.component';
import { ProjectComponent } from '../features/project/project.component';
import { UserComponent } from '../features/user/user.component';
import { DepartmentComponent } from '../features/department/department.component';
import { LeaveComponent } from '../features/leave/leave.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { LoginComponent } from '../features/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'shared',
    component: SharedComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'designation', component: DesignationComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'user', component: UserComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'leave', component: LeaveComponent },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SharedRoutingModule {}
