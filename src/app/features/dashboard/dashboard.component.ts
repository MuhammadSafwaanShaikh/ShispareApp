
import { Component } from '@angular/core';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dashboardTableHeading: string[] = [];

  constructor(public featuresService: FeaturesService) { }

  ngOnInit(): void {
    // Data for the dashboard
    this.dashboardTableHeading = [
      'EMPLOYEE #',
      'EMPLOYEE',
      'ATTENDANCE DATE',
      'CHANGE TYPE',
      'STATUS',
      'APPROVALS',
      'ADDONS',
      'ACTION'
    ];

    this.featuresService.data = [
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
      { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    ];
  }
}
