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
  // columnMapping: { [key: string]: string } = {
  //   'First': 'firstName',
  //   'ID': 'id',
  //   'AGE': 'age',

  //   'name': 'lastName',
  //   'DOB': 'dob'
  // };
attendanceTableHeading: string[] = ['Department','ID','created_at' ];
 @Input() DepartmentData: any[] = [];
 newDepartment: any = {};
 visible=false;
 @Input() departments: any[] = [];
 @Output() deleteDepartment = new EventEmitter<number>();
 

  constructor(private dataService: DataService) {}


  ngOnInit() {
    // this.dataService. getDepartments().subscribe((data) => {
    //   // Customize the order of columns based on the mapping
    //   this.attendanceData = data.map((item) => {
    //     return {
    //       'First Name': item.firstName,
    //       'ID': item.id,
    //       'Last name': item.lastName,
    //       'Age': item.age,
    //       'Address': item.address,
    //       'DOB': item.dob,
    //     };
    
    //   });
    // });
    this.loadDepartments();
  }

  // loadDepartments(){
  //   this.dataService.getDepartments().subscribe((data) => {
  //     this.DepartmentData = data.map((item)=>{
  //       return {
  //         'ID':item.id,
  //         'Department':item.department
  //       }

  //     }
  //     )
  //   });
  // }
  // loadDepartments() {
  //   this.dataService.getDepartments().subscribe(
  //     (response: any) => {
  //       if (response && response.departments) {
  //         this.DepartmentData = response.departments;
  //       } else {
  //         console.error('API response is missing departments or is in an unexpected format.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error loading departments:', error);
  //     }
  //   );
  // }
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
              created_at:department.created_at
             
              
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
  
  // addDepartment() {
  //   this.dataService.createDepartment(this.newDepartment).subscribe(
  //     () => {
  //       // Department added successfully, so refresh the list of departments
  //       this.loadDepartments();
  //       // Clear the new department form
  //       this.newDepartment = {};
  //     },
  //     (error) => {
  //       console.error('Error adding department:', error);
  //     }
  //   );
  // }

  // deleteItem(department: any) {
  //   if (confirm('Are you sure you want to delete this department?')) {
  //     this.dataService.deleteDepartment(department.id).subscribe(
  //       (response) => {
  //         // Item deleted successfully. You may want to refresh the department list.
  //         this.loadDepartments();
  //       },
  //       (error) => {
  //         // Handle the error, such as showing an error message.
  //         console.error('Error deleting department:', error);
  //       }
  //     );
  //   }
  // }

  // deleteItem(department: any) {
  //   // Existing logic
  //   this.dataService.deleteDepartment(department.id).subscribe(
  //     (response) => {
  //       // Item deleted successfully
  //       // Emit the delete action to the parent component (if needed)
  //       this.deleteDepartment.emit(department.id);
  //     },
  //     (error) => {
  //       console.error('Error deleting department:', error);
  //     }
  //   );
  // }
  





  showDialog() {
    this.visible = true;
  }
  hideDialog() {
    this.visible = false;
  }
}
  
  



