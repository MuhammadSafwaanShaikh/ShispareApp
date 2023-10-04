import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, RouterModule,AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
