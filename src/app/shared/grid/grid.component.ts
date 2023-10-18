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
  selectAll: boolean = false;
 
  constructor() { 
  
  }

  toggleSelectAll(): void {
    this.employee.forEach(emp => {
      emp.checked = this.selectAll;
    });
  }
 
  toggleDropdown(employee: any): void {
    
    employee.isDropdownOpen = !employee.isDropdownOpen;
    this.employee.forEach((emp) => {
      if (emp !== employee) {
        emp.isDropdownOpen = false;
      }
    });
  }

  editItem(employee: any): void {
    // Implement your edit logic here
    console.log('Edit clicked for employee:', employee);
  }

  viewItem(employee: any): void {
    // Implement your view logic here
    console.log('View clicked for employee:', employee);
  }
 



  toggleSelectAll(): void {
    this.employee.forEach(emp => {
      emp.checked = this.selectAll;
    });
  }

  toggleDropdown(employee: any): void {
    employee.isDropdownOpen = !employee.isDropdownOpen;
    this.employee.forEach((emp) => {
      if (emp !== employee) {
        emp.isDropdownOpen = false;
      }
    });
  }

  editItem(employee: any): void {
    console.log('Edit clicked for employee:', employee);
  }
  viewItem(employee: any): void {
    console.log('View clicked for employee:', employee);
  }
  ngOnInit() {
  }

}