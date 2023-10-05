import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    // Data for the dashboard
    this.dataService.employee = [
      { id: 1, name: 'John', country: 'USA', company: 'ABC Inc.' },
      { id: 2, name: 'Alice', country: 'Canada', company: 'XYZ Ltd.' }
    ];
  }
}
