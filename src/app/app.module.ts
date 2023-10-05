import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedComponent } from './shared/shared.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { RecruitmentComponent } from './main/recruitment/recruitment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    LoginComponent,
    DashboardComponent,
    SharedComponent,
    RecruitmentComponent,
    MainComponent

  ],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, TableModule, ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
