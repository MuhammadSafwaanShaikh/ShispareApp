import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'sidebar', component: SideBarComponent },

  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

