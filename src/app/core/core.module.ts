import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [HeaderComponent,
    SideBarComponent],
  imports: [
    CommonModule, BrowserModule, RouterModule, AppRoutingModule
  ],
  exports: [
    HeaderComponent, SideBarComponent
  ],

 
})
export class CoreModule { }
