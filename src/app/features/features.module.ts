import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
// import { AttendanceComponent } from './Department/department.component';
import { DepartmentComponent } from './Department/department.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent,
    DashboardComponent,
    RecruitmentComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],

})
export class FeaturesModule { }
