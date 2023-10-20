import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Department } from 'src/app/interface/department';
import { FeaturesService } from 'src/app/services/features.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],

})
export class GridComponent {
  @Input() tableHeading: string[] = [];
  @Input() data: any[] = [];
  @Input() formDepartment!: FormGroup
  @Input() updateDepartmentForm!:FormGroup
  selectedDepartmentId: number | null = null;
  
  visible: boolean = false;
  visibleEdit: boolean = false;
  checks: boolean = false;

  constructor( private featuresService: FeaturesService,private fb:FormBuilder) {
    this.updateDepartmentForm = this.fb.group({
      id: [null],
      department: '',
      
    });
  }

  ngOnInit() {
    this.featuresService.getDepartments().subscribe(data => {
         this.updateDepartmentForm.patchValue(data);
       });
  }

submitEditForm(id:any) {
    if (this.updateDepartmentForm.valid) {
      const formData = this.updateDepartmentForm.value;
      this.featuresService.updateDepartmentData(this.selectedDepartmentId,formData).subscribe(response => {
        console.log('Data updated successfully', response);
        window.location.reload();
      });
    } 
    this.selectedDepartmentId = null;
  }


  submitForm() {
    if (this.formDepartment.valid) {
      const formData = this.formDepartment.value;
      this.featuresService.setFormData(formData);
    }
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

  deleteItem(id: number): void {
    console.log('Deleting department with ID:', id);
      this.featuresService.deleteDepartment(id).subscribe(
        response => {
          console.log('Department deleted successfully:', response);
          window.location.reload();
        },
        error => {
          console.error('Error deleting department:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
  }

  getDataProperties(data: any): string[] {
    return Object.keys(data)
  }

  showDialog() {  
    this.visible = true;
  }

  showDialogEdit(data:any) {
    this.selectedDepartmentId = data.id;
    this.updateDepartmentForm.patchValue({
      department: data.department,
      // ... patch other form controls if needed
    });
    this.visibleEdit = true;
  }
}