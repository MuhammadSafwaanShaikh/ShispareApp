import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.css']
})
export class RecruitmentComponent {
  recruitmentTableHeading: string[] = [];
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    // Data for the dashboard
    this.recruitmentTableHeading=[ 'AMOUNT',
    'FEES',
    'SCHOOL NAME',
    'CLASS',
    'ITEM',
    'STATUS',
    'ADDONS',
    'ACTION'];
    this.dataService.employee = [
      { name: 'Wahaj', country: 'USA', company: 'ABC Inc.' },
      { name: 'Kazim', country: 'Canada', company: 'XYZ Ltd.' }
    ];
  }
}
