import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponent } from './shared.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { RecruitmentComponent } from '../features/recruitment/recruitment.component';
import { EmployeeComponent } from '../features/employee/employee.component';
import { DepartmentComponent } from '../features/department/department.component';
import { LeaveComponent } from '../features/leave/leave.component';

const routes: Routes = [
  {
    path: 'shared',
    component: SharedComponent,
    children: [
      // { path: '', redirectTo: 'attendance', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'recruitment', component: RecruitmentComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'leave', component: LeaveComponent },

    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SharedRoutingModule { }
