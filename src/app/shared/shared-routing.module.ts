import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponent } from './shared.component';
import { DesignationComponent } from '../features/designation/designation.component';
import { ProjectComponent } from '../features/project/project.component';
import { EmployeeComponent } from '../features/employee/employee.component';
import { DepartmentComponent } from '../features/department/department.component';
import { LeaveComponent } from '../features/leave/leave.component';

const routes: Routes = [
  {
    path: 'shared',
    component: SharedComponent,
    children: [
      // { path: '', redirectTo: 'attendance', pathMatch: 'full' },
      { path: 'designation', component: DesignationComponent },
      { path: 'project', component: ProjectComponent },
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
