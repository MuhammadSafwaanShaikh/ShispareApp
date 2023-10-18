import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { SharedRoutingModule } from './shared/shared-routing.module';


const routes: Routes = [
  { path: '', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

