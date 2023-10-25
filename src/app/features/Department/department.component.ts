import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent  {
 
attendanceTableHeading: string[] = ['Department','ID','Action' ];
 @Input() DepartmentData: any[] = [];
 newDepartment: any = {};
 visible=false;
 @Input() departments: any[] = [];
 @Output() deleteDepartment = new EventEmitter<number>();
 

  constructor(private dataService: DataService) {}


  ngOnInit() {
  
    this.loadDepartments();
  }

 
  loadDepartments() {
    this.dataService.getDepartments().subscribe(
      (response: any) => {
        if (response && response.departments) {
          const extractedData = [];
  
          for (const department of response.departments) {
            // Create a new object with the desired properties
            const extractedDepartment = {
              Department: department.department,
              ID: department.id,
              // created_at:department.created_at
             
              
            };
  
            extractedData.push(extractedDepartment);
          }
  
          this.DepartmentData = extractedData;
        } else {
          console.error('API response is missing departments or is in an unexpected format.');
        }
      },
      (error) => {
        console.error('Error loading departments:', error);
      }
    );
  }
  



  showDialog() {
    this.visible = true;
  }
  hideDialog() {
    this.visible = false;
  }
}
  
  



