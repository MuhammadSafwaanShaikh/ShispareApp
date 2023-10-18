import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() tableHeading: string[]=[];
  @Input() employee: any[] = [];
 
  isDropdownOpen: boolean = false;
  newDepartment: any = {};

  visible: boolean = false;

  
  selectAll: boolean = false;
  checks:boolean=false;
  bulk(e:any){
    if(e.target.checked==true){
      this.checks=true
    }
    else{
      this.checks=false

    }
  }
  

 
  constructor() { }

 

  editItem(employee: any): void {
    // Implement your edit logic here
    console.log('Edit clicked for employee:', employee);
  }

  viewItem(employee: any): void {
    // Implement your view logic here
    console.log('View clicked for employee:', employee);
  }
 
  getEmployeeProperties(employee: any): string[] {
    // Assuming 'employee' is an object with various properties,
    // this function returns an array of property names.
    return Object.keys(employee);
}

  ngOnInit() {
  }





}