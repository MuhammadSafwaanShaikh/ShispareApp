import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from '../app-routing.module';
import { SpinnerComponent } from '../spinner/spinner.component';
import { LoaderInterceptor } from '../interceptors/loader.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [GridComponent, SpinnerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],

  exports: [
    GridComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    MessageService
  ]
})
export class SharedModule { }
