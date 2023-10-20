import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  recruitmentHeading: string[] = []

  constructor(public featuresService: FeaturesService) { }

  ngOnInit(): void {
    // Data for the dashboard

    this.recruitmentHeading = [
      'AMOUNT',
      'FEES',
      'SCHOOL NAME',
      'CLASS',
      'ITEM',
      'STATUS',
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
