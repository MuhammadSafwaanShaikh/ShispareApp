import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UrlSegment } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {MessageService} from 'primeng/api';


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
  isEditFormOpen: boolean = false;
  editFormFields: any[] = [];
  isAddFormOpen: boolean = false;
  addFormType: string = '';
  addFormFields: any[] = [];
  formData: any = {};
  currentComponentType: string ='';
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
  
  constructor(private dataService: DataService,private route: ActivatedRoute,private messageService: MessageService) { }

 
  editItem(employee: any): void {
    this.isEditFormOpen = true;
    this.formData = { ...employee }; // Clone employee data for editing
    console.log('ID to update:', this.formData);
    this.editFormFields = this.getFormFields(this.currentComponentType);
  }

 
  getEmployeeProperties(employee: any): string[] {
    return Object.keys(employee);
}

ngOnInit() {
  this.route.url.subscribe((segments: UrlSegment[]) => {
    const routeSegment = segments[segments.length - 1].path;

    if (routeSegment === 'department') {
      this.currentComponentType = 'Department';
    } else if (routeSegment === 'project') {
      this.currentComponentType = 'Project';
    } else if (routeSegment === 'designation') {
      this.currentComponentType = 'designation';
    } else {
      // Handle other component types as needed
    }
   
  });
}
  
  
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
        { label: 'Department', type: 'text', name: 'department', required: true }
      ];
    } else if (componentType === 'Project') {
      return [
        { label: 'Project', type: 'text', name: 'project', required: true }
      ];
    }
    else if (componentType === 'designation') {
      return [
        { label: 'Designation ', type: 'text', name: 'designation', required: true }
      ];
    }
    // Add more cases for other component types and their fields
    return [];
  }

  //ADD BUTTON FUNCTIONALITY
 
  saveFormData() {
    console.log('saveFormData function called');
    if (this.currentComponentType === 'Department') {
      console.log('Creating department with data:', this.formData);
      this.dataService.createDepartment(this.formData).subscribe(
        (response) => {
          this.formData = {};
         
        },

        (error) => {
          console.error('Error adding department:', error);
        }
        
      );
    } else if (this.currentComponentType === 'Project') {
      console.log('Creating project with data:', this.formData);
    this.dataService.createProject(this.formData).subscribe(
      (response) => {
        this.formData = {};
      },
      (error) => {
        console.error('Error adding project:', error);
      }
    );
    }else if (this.currentComponentType === 'designation') {
      console.log('Creating project with data:', this.formData);
    this.dataService.createDesignation(this.formData).subscribe(
      (response) => {
        this.formData = {};
      },
      (error) => {
        console.error('Error adding project:', error);
      }
    );
    }
    this.isAddFormOpen = false;
   
  }
  closeModal() {
    this.isAddFormOpen = false;
  }
 
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}


  //EDIT BUTTON FUNCTIONALITY

 
  openEditForm(employee: any) {
    if (this.currentComponentType !== null) {
      this.editFormFields = this.getFormFields(this.currentComponentType);
      this.formData = { ...employee }; 
      console.log('ID to update:', this.formData);
      this.isEditFormOpen = true;
    } else {
      console.error('currentComponentType is null. Cannot open the edit form.');
    }
  }
  
  
 
  updateData() {
    if (this.currentComponentType === 'Department') {
      if (this.formData && this.formData.ID) {
        this.dataService.updateDepartment(this.formData.ID, this.formData).subscribe(
          (response) => {
            console.log(response);
            this.isEditFormOpen = false;
          },
          (error) => {
            console.error('Error updating department:', error);
          }
        );
      } else {
        console.error('The ID to update is not defined.');
      }
    } else if (this.currentComponentType === 'Project') {
      if (this.formData && this.formData.id) {
        this.dataService.updateProject(this.formData.id, this.formData).subscribe(
          (response) => {
            console.log(response);
            this.isEditFormOpen = false;
          },
          (error) => {
            console.error('Error updating project:', error);
          }
        );
      } else {
        console.error('The ID to update is not defined.');
      }
    }else if (this.currentComponentType === 'designation') {
      if (this.formData && this.formData.ID) {
        this.dataService.updateDesignation(this.formData.ID, this.formData).subscribe(
          (response) => {
            console.log(response);
            this.isEditFormOpen = false;
          },
          (error) => {
            console.error('Error updating project:', error);
          }
        );
      } else {
        console.error('The ID to update is not defined.');
      }
    }
  }

      //DELETE BUTTON FUNCTIONALITY
  deleteItem(employee: any) {
    if (confirm('Are you sure you want to delete this item?')) {
      if (this.currentComponentType === 'Department') {
        this.dataService.deleteDepartment(employee.ID).subscribe(
          () => {
            this.handleDeleteSuccess(employee);
          },
          (error) => {
            this.handleDeleteError(error);
          }
        );
      } else if (this.currentComponentType === 'Project') {
        this.dataService.deleteProject(employee.id).subscribe(
          () => {
            this.handleDeleteSuccess(employee);
          },
          (error) => {
            this.handleDeleteError(error);
          }
        );
      }else if (this.currentComponentType === 'designation') {
        this.dataService.deleteDesignation(employee.ID).subscribe(
          () => {
            this.handleDeleteSuccess(employee);
          },
          (error) => {
            this.handleDeleteError(error);
          }
        );
      }
    }
  }
 
  showConfirm(employee: any) {
    this.messageService.clear();
    this.messageService.add({
      key: 'confirmation',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
    });

    // this.messageService.onClose.subscribe((event) => {
    //   if (event) {
    //     // User confirmed the action, delete the item
    //     this.deleteItem(employee);
    //   }
    // });
  }
  
  
  handleDeleteSuccess(employee: any) {
    const index = this.employee.indexOf(employee);
    if (index !== -1) {
      this.employee.splice(index, 1);
    }
  }
  handleDeleteError(error: any) {
    console.error('Error deleting item:', error);
  }
  
  
  



}


  









 


