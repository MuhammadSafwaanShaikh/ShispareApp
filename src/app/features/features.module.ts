import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { LeaveComponent } from './leave/leave.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [LoginComponent,
    DashboardComponent,
    RecruitmentComponent,
    EmployeeComponent,
    DepartmentComponent,
    LeaveComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    DialogModule
  ],

})
export class FeaturesModule { }
