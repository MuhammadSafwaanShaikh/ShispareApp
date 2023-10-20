import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UrlSegment } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';





@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() tableHeading: string[]=[];
  @Input() employee: any[] = [];
  @ViewChild('addFormDialog') addFormDialog: Dialog | undefined;
  
  isDropdownOpen: boolean = false;
  newDepartment: any = {};
  departmentToEdit: any; // To hold the department being edited
  department: any;



  isAddFormOpen: boolean = false;
  addFormType: string = '';
  addFormFields: any[] = [];
  formData: any = {};
  // currentComponentType: string = '';
  // currentComponentType: string = 'Department';
  currentComponentType: string | null = null;


 

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
  

 
  constructor(private dataService: DataService,private route: ActivatedRoute) { }

 

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
  this.route.url.subscribe((segments: UrlSegment[]) => {
    const routeSegment = segments[segments.length - 1].path;

    if (routeSegment === 'department') {
      this.currentComponentType = 'Department';
    } else if (routeSegment === 'project') {
      this.currentComponentType = 'Project';
    } else {
      // Handle other component types as needed
    }
  });


  
}
  deleteItem(employee: any) {
    console.log('Delete item called with employee:', employee);
    // You can add a confirmation dialog here if needed
    if (confirm('Are you sure you want to delete this item?')) {
      this.dataService.deleteDepartment(employee.id).subscribe(
        () => {
          // Successfully deleted, remove the item from your local array or data source
          const index = this.employee.indexOf(employee);
          if (index !== -1) {
            this.employee.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error deleting item:', error);
          // Handle error
        }
      );
    }
  }

  // editItem(employee: any) {
  //   // You can directly edit the properties of the employee object
  //   employee.isEditing = true;
  // }

  updateDepartment(employee: any) {
    // Extract the department ID from the employee object
    const id = employee.id;
  
    // Send the update request to the API with both the ID and the updated data
    this.dataService.updateDepartment(id, employee).subscribe(
      (updatedEmployee) => {
        // Handle the updated department data
        employee.isEditing = false; // Clear the editing flag
      },
      (error) => {
        console.error('Error updating department:', error);
      }
    );
  }
  
  
  // openAddNewForm(componentType: string) {
  //   console.log('openAddNewForm called with componentType:', componentType);
  //   this.isAddFormOpen = true;
  //   this.addFormType = componentType;
  //   this.currentComponentType = componentType;
  //   console.log('isAddFormOpen:', this.isAddFormOpen);
  //   console.log('addFormType:', this.addFormType);
  //   console.log('currentComponentType:', this.currentComponentType);

  //   // Initialize formData object and form fields based on the component type
  //   if (componentType === 'Department') {
  //     this.addFormFields = [
  //       { label: 'Department Name', type: 'text', name: 'departmentName', required: true }
  //     ];
  //   } else if (componentType === 'Project') {
  //     this.addFormFields = [
  //       { label: 'Project Name', type: 'text', name: 'projectName', required: true }
  //     ];
  //   }
  //   // Add more cases for other component types and their fields

  //   console.log('addFormFields:', this.addFormFields);
  // }
  openAddNewForm(componentType: string) {
    console.log('Opening form for component type:', componentType);
    this.currentComponentType = componentType;
    this.isAddFormOpen = true;
    this.addFormType = componentType;
    this.addFormFields = this.getFormFields(componentType);
  }
  getFormFields(componentType: string): any[] {
    if (componentType === 'Department') {
      return [
        { label: 'Department Name', type: 'text', name: 'department', required: true }
      ];
    } else if (componentType === 'Project') {
      return [
        { label: 'Project Name', type: 'text', name: 'projectName', required: true }
      ];
    }
    // Add more cases for other component types and their fields
    return [];
  }
  // saveFormData() {
  //   if (this.currentComponentType === 'Department') {
  //     this.dataService.createDepartment(this.formData).subscribe((response) => {
  //       // Handle the response as needed
  //     });
  //   } else if (this.currentComponentType === 'Project') {
  //     // Add logic to make a POST request to the Project API endpoint using the dataService
  //   }
  //   this.isAddFormOpen = false;
  // }

  saveFormData() {
    console.log('saveFormData function called');
    if (this.currentComponentType === 'Department') {
      console.log('Creating department with data:', this.formData);
      this.dataService.createDepartment(this.formData).subscribe(
        (response) => {
          // console.log('Department created. API response:', response);
          // Handle the response as needed
          // this.employee.push(response);
          // Clear the form
          // return response
          this.formData = {};
        },
        (error) => {
          console.error('Error adding department:', error);
        }
      );
    } else if (this.currentComponentType === 'Project') {
      // Add logic to make a POST request to the Project API endpoint using the dataService
    }
    this.isAddFormOpen = false;
   
  }
  closeModal() {
    // Set the isAddFormOpen variable to false or perform any other necessary actions to close the modal.
    this.isAddFormOpen = false;
  }



}


  









 


