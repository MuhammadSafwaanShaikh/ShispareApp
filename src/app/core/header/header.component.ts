import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private featuresService: FeaturesService,
    private router: Router
  ) {}
  logout() {
    this.featuresService.logoutUser();
    this.router.navigate(['/login']); // You can also navigate to the login page or perform additional actions here
  }
}
