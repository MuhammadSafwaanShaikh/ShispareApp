import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    'Department Name',
    'Created At',
    'Updated At',
    'Status',
    'Action',
  ];

  @Input() projData: any[] = [];
  projectForm!: FormGroup;
  updateProjectForm!: FormGroup;
  @Input() optionLabel: string = '';
  constructor(
    public featuresService: FeaturesService,
    private formService: FormService,
    private router: Router
  ) {
    this.projectForm = formService.getForm();
    this.updateProjectForm = formService.getUpdateForm();
  }

  ngOnInit(): void {
    this.loadProjects();
    this.deleteProject();
  }

  // loadProjects() {
  //   this.featuresService.getProjects().subscribe(
  //     (response: any) => {
  //       if (response && response.projects) {
  //         const transformedData: any[] = [];
  //         for (const item of response.projects) {
  //           transformedData.push({
  //             id: item.id,
  //             project: item.project,
  //             created_at: item.created_at,
  //             updated_at: item.updated_at,
  //             status: item.status,
  //           });
  //         }
  //         this.projData = transformedData;
  //       } else {
  //         console.error(
  //           'API response is missing departments or is in an unexpected format.'
  //         );
  //       }
  //     },
  //     (error) => {
  //       console.error('Error loading departments:', error);
  //     }
  //   );
  // }

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
    if (this.projectForm.valid) {
      this.featuresService.addProjectsData(this.projectForm.value).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          this.loadProjects();
          this.projectForm.reset();
        }
        // (error) => {
        //   console.error('Error sending data:', error);
        // }
      );
    }
  }

  submitEditProjectForm() {
    this.formService.getSelectedId().subscribe((id) => {
      if (this.updateProjectForm.valid) {
        this.featuresService
          .updateProjectData(id, this.updateProjectForm.value)
          .subscribe((response) => {
            console.log('Data updated successfully', response);
            //this.featuresService.getProjects();
            this.loadProjects();
            this.updateProjectForm.reset();
          });
      }
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
}
