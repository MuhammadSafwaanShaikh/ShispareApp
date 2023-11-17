import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { DynamicFormControl } from 'src/app/interface/dynamicFormControls';
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
  messages: Message[] = [];

  @Input() departData: any[] = [];
  departmentForm!: FormGroup;
  updateDepartmentForm!: FormGroup;
  dynamicDepartForm: DynamicFormControl[] = [];
  visible!: boolean;
  visibleEdit!: boolean;
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

  generateDynamicFormModel() {
    // Assuming you have unique keys for your form controls
    const dynamicUserFormModel: DynamicFormControl[] = [
      {
        key: 'department',
        label: 'Select Department',
        controlType: 'input',
        type: 'text',
      },
    ];

    // Assign the generated form model to the dynamicUserForm
    this.dynamicDepartForm = dynamicUserFormModel;
  }
  loadDepartments() {
    this.featuresService.getDepartments().subscribe((response: any) => {
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
        this.generateDynamicFormModel();
      } else {
        console.error(
          'API response is missing departments or is in an unexpected format.'
        );
      }
    });
  }

  submitDepartmentForm() {
    this.featuresService.addDepartmentData(this.departmentForm.value).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        this.visible = false;
        this.loadDepartments();
        this.departmentForm.reset();
      },
      (error) => {
        console.error(error);
        //Validation errors returned from API
        const apiErrors = error.error.errors;
        this.handleApiErrors(apiErrors);
      }
    );
  }

  submitEditDepartmentForm() {
    this.formService.getSelectedId().subscribe((id) => {
      this.featuresService
        .updateDepartmentData(id, this.updateDepartmentForm.value)
        .subscribe(
          (response) => {
            console.log('Data updated successfully', response);
            this.visibleEdit = false;
            this.loadDepartments();
            this.updateDepartmentForm.reset();
          },
          (error) => {
            console.error(error);
            //Validation errors returned from API
            const apiErrors = error.error.errors;
            this.handleApiErrors(apiErrors);
          }
        );
    });
  }

  deleteDepartment() {
    this.formService.deleteAction$.subscribe((id) => {
      if (id !== null) {
        this.featuresService.deleteDepartment(id).subscribe((response) => {
          console.log('Delete department with ID:', response);
          this.loadDepartments();
          this.messages = [
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Item Deleted',
              life: 3000,
            },
          ];
        });
      }
    });
  }
  private handleApiErrors(apiErrors: any) {
    Object.keys(apiErrors).forEach((controlName) => {
      const formControl = this.departmentForm.get(controlName);
      if (formControl) {
        formControl.setErrors({ apiError: apiErrors[controlName][0] });
      }
    });
  }
}
