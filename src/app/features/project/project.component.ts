import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormControl } from 'src/app/interface/dynamicFormControls';
import { FeaturesService } from 'src/app/services/features.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  projectHeading: string[] = [
    'ID',
    'Project Name',
    'Created At',
    'Updated At',
    'Status',
    'Action',
  ];

  @Input() projData: any[] = [];
  projectForm!: FormGroup;
  updateProjectForm!: FormGroup;
  dynamicProjectForm: DynamicFormControl[] = [];

  visible!: boolean;
  visibleEdit!: boolean;
  constructor(
    public featuresService: FeaturesService,
    private formService: FormService,
    private fb: FormBuilder
  ) {
    this.projectForm = formService.getForm();
    this.updateProjectForm = formService.getUpdateForm();
  }
  generateDynamicFormModel() {
    const dynamicFormModel: DynamicFormControl[] = [
      {
        key: 'project',
        label: 'Select Project',
        controlType: 'input',
        type: 'text',
      },
      {
        key: 'status',
        label: 'Status',
        controlType: 'dropdown',
        type: 'text',
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' },
        ],
      },
    ];
    this.dynamicProjectForm = dynamicFormModel;
  }
  ngOnInit(): void {
    this.loadProjects();
    this.deleteProject();
  }

  loadProjects() {
    this.featuresService.getProjects().subscribe({
      next: (response: any) => {
        if (response && response.projects) {
          const transformedData: any[] = [];
          for (const item of response.projects) {
            transformedData.push({
              id: item.id,
              project: item.project,
              created_at: item.created_at,
              updated_at: item.updated_at,
              status: item.status,
            });
          }
          this.projData = transformedData;
          this.generateDynamicFormModel();
        } else {
          console.error(
            'API response is missing departments or is in an unexpected format.'
          );
        }
      },
      error: (error: any) => {
        console.error('Error loading departments:', error);
      },
    });
  }

  submitProjectForm() {
    this.featuresService.addProjectsData(this.projectForm.value).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        this.visible = false;
        this.loadProjects();
        this.projectForm.reset();
      },
      (error) => {
        console.error(error);
        //Validation errors returned from API
        const apiErrors = error.error.errors;
        this.handleApiErrors(apiErrors);
      }
    );
  }

  submitEditProjectForm() {
    this.formService.getSelectedId().subscribe((id) => {
      this.featuresService
        .updateProjectData(id, this.updateProjectForm.value)
        .subscribe(
          (response) => {
            console.log('Data updated successfully', response);
            this.visibleEdit = false;
            this.loadProjects();
            this.updateProjectForm.reset();
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

  deleteProject() {
    this.formService.deleteAction$.subscribe((id) => {
      if (id !== null) {
        this.featuresService.deleteProject(id).subscribe((response) => {
          console.log('Delete project with ID:', response);
          this.loadProjects();
        });
      }
    });
  }
  private handleApiErrors(apiErrors: any) {
    Object.keys(apiErrors).forEach((controlName) => {
      const formControl = this.projectForm.get(controlName);
      if (formControl) {
        formControl.setErrors({ apiError: apiErrors[controlName][0] });
      }
    });
  }
}
