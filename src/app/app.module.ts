import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { LoginComponent } from './feature/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedComponent } from './shared/shared.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { GridComponent } from './shared/grid/grid.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { RecruitmentComponent } from './feature/recruitment/recruitment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    LoginComponent,
    DashboardComponent,
    SharedComponent,
    RecruitmentComponent,
    GridComponent

  ],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, TableModule, ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
