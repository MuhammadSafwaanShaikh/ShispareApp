import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormControl } from 'src/app/interface/dynamicFormControls';
import { FeaturesService } from 'src/app/services/features.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
})
export class DesignationComponent {
  designationTableHeading = [
    'ID',
    'Designation Name',
    'Created At',
    'Updated At',
    'Action',
  ];
  dynamicDesigForm: DynamicFormControl[] = [];

  @Input() desigData: any[] = [];
  designationForm!: FormGroup;
  updateDesignationForm!: FormGroup;
  visible!: boolean;
  visibleEdit!: boolean;
  constructor(
    public featuresService: FeaturesService,
    private formService: FormService
  ) {
    this.designationForm = formService.getForm();
    this.updateDesignationForm = formService.getUpdateForm();
  }

  ngOnInit(): void {
    this.generateDynamicFormModel();
    this.loadDesignations();
    this.deleteDesignation();
  }
  generateDynamicFormModel() {
    // Assuming you have unique keys for your form controls
    const dynamicUserFormModel: DynamicFormControl[] = [
      {
        key: 'designation',
        label: 'Select Designation',
        controlType: 'input',
        type: 'text',
      },
    ];

    // Assign the generated form model to the dynamicUserForm
    this.dynamicDesigForm = dynamicUserFormModel;
  }

  // Call this method when needed, for example, in your showDialogEdit method
  // after setting the values in updateForm.
  loadDesignations() {
    this.featuresService.getDesignations().subscribe((response: any) => {
      if (response && response.designations) {
        const transformedData: any[] = [];
        for (const item of response.designations) {
          transformedData.push({
            id: item.id,
            designation: item.designation,
            created_at: item.created_at,
            updated_at: item.updated_at,
          });
        }
        this.desigData = transformedData;
        this.generateDynamicFormModel();
      } else {
        console.error(
          'API response is missing departments or is in an unexpected format.'
        );
      }
    });
  }

  submitDesignationForm() {
    this.featuresService
      .addDesignationData(this.designationForm.value)
      .subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          this.visible = false;
          this.designationForm.reset();
          this.loadDesignations();
        },
        (error) => {
          console.error(error);
          //Validation errors returned from API
          const apiErrors = error.error.errors;
          this.handleApiErrors(apiErrors);
        }
      );
  }

  submitEditDesignationForm() {
    this.formService.getSelectedId().subscribe((id) => {
      this.featuresService
        .updateDesignationData(id, this.updateDesignationForm.value)
        .subscribe(
          (response) => {
            console.log('Data updated successfully', response);
            this.visibleEdit = false;
            this.updateDesignationForm.reset();
            this.loadDesignations();
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

  deleteDesignation() {
    this.formService.deleteAction$.subscribe((id) => {
      if (id !== null) {
        this.featuresService.deleteDesignation(id).subscribe((response) => {
          console.log('Delete Designation with ID:', response);

          this.loadDesignations();
        });
      }
    });
  }
  private handleApiErrors(apiErrors: any) {
    Object.keys(apiErrors).forEach((controlName) => {
      const formControl = this.designationForm.get(controlName);
      if (formControl) {
        formControl.setErrors({ apiError: apiErrors[controlName][0] });
      }
    });
  }
}
