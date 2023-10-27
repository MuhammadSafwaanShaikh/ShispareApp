import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeaturesService } from 'src/app/services/features.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent {
  departmentTableHeading: string[] = [
    'ID',
    'Department Name',
    'Created At',
    'Updated At',
    'Action',
  ];

  @Input() departData: any[] = [];
  departmentForm!: FormGroup;
  updateDepartmentForm!: FormGroup;

  constructor(
    private featuresService: FeaturesService,
    private formService: FormService
  ) {
    this.departmentForm = formService.getForm();
    this.updateDepartmentForm = formService.getUpdateForm();
  }

  ngOnInit() {
    this.loadDepartments();
    this.deleteDepartment();
  }

  loadDepartments() {
    this.featuresService.getDepartments().subscribe(
      (response: any) => {
        if (response && response.departments) {
          const transformedData: any[] = [];

          for (const item of response.departments) {
            transformedData.push({
              id: item.id,
              department: item.department,
              created_at: item.created_at,
              updated_at: item.updated_at,
            });
          }
          this.departData = transformedData;
        } else {
          console.error(
            'API response is missing departments or is in an unexpected format.'
          );
        }
      }
      // (error) => {
      //   console.error('Error loading departments:', error);
      // }
    );
  }

  submitDepartmentForm() {
    if (this.departmentForm.valid) {
      this.featuresService
        .addDepartmentData(this.departmentForm.value)
        .subscribe(
          (response) => {
            console.log('Data sent successfully:', response);
            this.loadDepartments();
            this.departmentForm.reset();
          }
          // (error) => {
          //   console.error('Error sending data:', error);
          // }
        );
    }
  }

  submitEditDepartmentForm() {
    this.formService.getSelectedId().subscribe((id) => {
      if (this.updateDepartmentForm.valid) {
        this.featuresService
          .updateDepartmentData(id, this.updateDepartmentForm.value)
          .subscribe((response) => {
            console.log('Data updated successfully', response);
            this.loadDepartments();
            this.updateDepartmentForm.reset();
          });
      }
    });
  }

  deleteDepartment() {
    this.formService.deleteAction$.subscribe((id) => {
      if (id !== null) {
        this.featuresService.deleteDepartment(id).subscribe((response) => {
          console.log('Delete department with ID:', response);
          this.loadDepartments();
        });
      }
    });
  }
}
