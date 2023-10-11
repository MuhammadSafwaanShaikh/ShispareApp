import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() tableHeading: string[] = [];
  @Input() data: any[] = [];

  checks: boolean = false;

  constructor() {
  }

  ngOnInit() {

  }

  bulk(e: any) {
    if (e.target.checked == true) {
      this.checks = true
    }
    else {
      this.checks = false
    }
  }



  editItem(data: any): void {
    console.log('Edit clicked for data:', data);
  }
  viewItem(data: any): void {
    console.log('View clicked for data:', data);
  }

  getDataProperties(data: any): string[] {
    return Object.keys(data)
  }


}