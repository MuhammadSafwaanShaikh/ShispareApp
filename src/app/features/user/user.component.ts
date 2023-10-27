import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FeaturesService } from 'src/app/services/features.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  userProjData: any[] = [];
  userDepartData: any[] = [];
  userDesigData: any[] = [];

  userTableHeading: string[] = [
    'ID',
    'First Name',
    'Last Name',
    'Project Name',
    'Department Name',
    'Designation Name',
  ];

  @Input() userData: any[] = [];
  userForm!: FormGroup;
  updateUserForm!: FormGroup;

  constructor(
    public featuresService: FeaturesService,
    private formService: FormService
  ) {
    this.userForm = formService.getForm();
    this.updateUserForm = formService.getUpdateForm();
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadDepartments();
    this.loadDesignations();
  }

  // *Getting Data From Components for dropdown fields
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
          this.userProjData = transformedData;
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
          this.userDepartData = transformedData;
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
        this.userDesigData = transformedData;
      } else {
        console.error(
          'API response is missing departments or is in an unexpected format.'
        );
      }
    });
  }

  loadUsers() {}
}
