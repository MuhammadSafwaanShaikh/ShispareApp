import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }

  navigateToDashboard() {
    this.router.navigate(['/shared']);
  }

}
