
import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dashboardTableHeading: string[] = [];

  constructor(public dataService: DataService) { }

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

    // this.dataService.employee = [
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    //   { id: 101, name: 'Waqas Ali', country: '15-sep-23', company: 'New Request', status: 'Approved', added: '16-Sep-23 10:15' },
    // ];
  }
}
