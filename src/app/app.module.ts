import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HeaderComponent } from './core/header/header.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { LoginComponent } from './feature/login/login.component';
import { FormsModule } from '@angular/forms';
=======
>>>>>>> 64f789ec5143922f96c8c535b499beb34b3e9f8a
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { SharedComponent } from './shared/shared.component';

<<<<<<< HEAD
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { GridComponent } from './shared/grid/grid.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { RecruitmentComponent } from './feature/recruitment/recruitment.component';
import { AttendanceComponent } from './feature/attendance/attendance.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    LoginComponent,
    DashboardComponent,
    SharedComponent,
    RecruitmentComponent,
    GridComponent,
    AttendanceComponent

  ],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, TableModule, ButtonModule,FormsModule
=======
@NgModule({
  declarations: [
    AppComponent, SharedComponent
>>>>>>> 64f789ec5143922f96c8c535b499beb34b3e9f8a
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, FeaturesModule, CoreModule
  ]
})
export class AppModule { }
