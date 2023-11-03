import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  @Input() desigData: any[] = [];
  designationForm!: FormGroup;
  updateDesignationForm!: FormGroup;

  constructor(
    public featuresService: FeaturesService,
    private formService: FormService
  ) {
    this.designationForm = formService.getForm();
    this.updateDesignationForm = formService.getUpdateForm();
  }

  ngOnInit(): void {
    this.loadDesignations();
    this.deleteDesignation();
  }

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
      } else {
        console.error(
          'API response is missing departments or is in an unexpected format.'
        );
      }
    });
  }

  submitDesignationForm() {
    if (this.designationForm.valid) {
      this.featuresService
        .addDesignationData(this.designationForm.value)
        .subscribe((response) => {
          console.log('Data sent successfully:', response);
          // this.loadDesignations();
          console.log('Show data:', this.designationForm.getRawValue());
          this.designationForm.reset();
        });
    }
  }

  submitEditDesignationForm() {
    this.formService.getSelectedId().subscribe((id) => {
      if (this.updateDesignationForm.valid) {
        this.featuresService
          .updateDesignationData(id, this.updateDesignationForm.value)
          .subscribe((response) => {
            console.log('Data updated successfully', response);
            this.loadDesignations();
            this.updateDesignationForm.reset();
          });
      }
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
}
