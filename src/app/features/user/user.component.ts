import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';

import { FeaturesService } from 'src/app/services/features.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  userProjData: any[] = [];
  userDepartData: any[] = [];
  userDesigData: any[] = [];

  userTableHeading: string[] = [
    'ID',
    'Name',
    'Email',
    'Deparment',
    'Project',
    'Designation',
    'Status',
    'Reports To',
    'Action',
  ];
  messages: Message[] = [];

  @Input() userData: any[] = [];
  userForm!: FormGroup;
  updateUserForm!: FormGroup;
  @Input() apiErrors: any = {};

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
    this.loadUsers();
    this.deleteUser();
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

  loadUsers() {
    this.featuresService.getUsers().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          const transformedData: any[] = [];
          for (const item of response.data) {
            transformedData.push({
              id: item.id,
              name: item.name,
              email: item.email,
              department_id: item.department_id,
              project_id: item.project_id,
              designation_id: item.designation_id,
              status: item.status,
              report_to: item.report_to,
            });
          }
          this.userData = transformedData;
        }
      },
    });
  }

  submitUserForm() {
    if (this.userForm.valid) {
      this.featuresService.addUserData(this.userForm.value).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          console.log('Data sent successfully:', this.userForm.value);
          this.loadUsers();
          this.userForm.reset();
          this.messages = [
            {
              severity: 'success',
              summary: 'Success',
              detail: 'Added Successfully',
              life: 3000,
            },
          ];
        },

        (error) => {
          console.error('Error adding user:', error);
          if (error.error && error.error.errors) {
            // Handle validation errors here
            this.apiErrors = error.error.errors;
          }
        }
      );
    }
  }

  submitEditUserForm() {
    this.formService.getSelectedId().subscribe((id) => {
      if (this.updateUserForm.valid) {
        this.featuresService
          .updateUserData(id, this.updateUserForm.value)
          .subscribe(
            (response) => {
              console.log('Data updated successfully', response);
              //this.featuresService.getProjects();
              this.loadUsers();
              this.updateUserForm.reset();
              this.messages = [
                {
                  severity: 'info',
                  summary: 'Info',
                  detail: 'Edited Successfully',
                  life: 3000,
                },
              ];
            },
            (error) => {
              console.error(error);
              this.messages = [
                {
                  severity: 'error',
                  summary: 'Error',
                  detail: error.error.message,
                  life: 3000,
                },
              ];
            }
          );
      }
    });
  }

  deleteUser() {
    this.formService.deleteAction$.subscribe((id) => {
      if (id !== null) {
        this.featuresService.deleteUser(id).subscribe((response) => {
          console.log('Delete User with ID: ', response);
          this.loadUsers();
        });
      }
    });
  }
}
