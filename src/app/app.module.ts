import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FeaturesModule } from './features/features.module';
import { CoreModule } from './core/core.module';
import { SharedComponent } from './shared/shared.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent, SharedComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, FeaturesModule, CoreModule, BrowserAnimationsModule
  ]
})
export class AppModule { }
