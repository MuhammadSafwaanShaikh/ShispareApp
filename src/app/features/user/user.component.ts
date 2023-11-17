import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';
import { DynamicFormControl } from 'src/app/interface/dynamicFormControls';
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
  dynamicUserForm: DynamicFormControl[] = [];
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
  visible!: boolean;
  visibleEdit!: boolean;
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
  ngOnDestroy() {
    this.userForm.reset();
  }

  generateDynamicFormModel() {
    // Assuming you have unique keys for your form controls
    const dynamicUserFormModel: DynamicFormControl[] = [
      {
        key: 'name',
        label: 'Name',
        controlType: 'input',
        type: 'text',
      },
      {
        key: 'email',
        label: 'Email',
        controlType: 'input',
        type: 'email',
      },
      {
        key: 'password',
        label: 'Password',
        controlType: 'input',
        type: 'password',
      },
      {
        key: 'status',
        label: 'Status',
        controlType: 'input',
        type: 'number',
      },
      {
        key: 'project_id',
        label: 'Select Project',
        controlType: 'dropdown',
        type: 'text',
        options: this.userProjData.map((item) => ({
          id: item.id,
          label: item.project,
        })),
      },
      {
        key: 'department_id',
        label: 'Select Department',
        controlType: 'dropdown',
        type: 'text',
        options: this.userDepartData.map((item) => ({
          id: item.id,
          label: item.department,
        })),
      },
      {
        key: 'designation_id',
        label: 'Select Designation',
        controlType: 'dropdown',
        type: 'text',
        // options: this.userData.map((item) => {
        //   console.log('Mapped Item:', item);
        //   return {
        //     designation_id: item.designation.id,
        //     designation_name: item.designation.name,
        //   };
        // }),
        options: this.userDesigData.map((item) => ({
          id: item.id,
          label: item.designation,
        })),
      },
      {
        key: 'report_to',
        label: 'Report To',
        controlType: 'dropdown',
        type: 'text',
        options: this.userData.map((item) => ({
          id: item.id,
          label: item.name,
          report_to_name: item.report_to_name,
        })),
      },
      // {
      //   key: 'report_to',
      //   label: 'Report To',
      //   controlType: 'dropdown',
      //   type: 'text',
      //   options: this.userData.map((item) => ({
      //     id: item.report_to_id,
      //     label: item.name,
      //     report_to_name: item.report_to_name,
      //   })),
      // },
    ];

    // Assign the generated form model to the dynamicUserForm
    this.dynamicUserForm = dynamicUserFormModel;
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
              department_id: item.department?.id,
              department_name: item.department?.name,
              project_id: item.project?.id,
              project_name: item.project?.name,
              designation_id: item.designation?.id,
              designation_name: item.designation?.name,
              status: item.status,
              report_to_id: item.report_to?.id,
              report_to_name: item.report_to?.name,
            });
          }
          this.userData = transformedData;
          // console.log(this.userData);

          this.generateDynamicFormModel();
        }
      },
    });
  }

  submitUserForm() {
    console.log(this.userForm.value);

    this.featuresService.addUserData(this.userForm.value).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        console.log('Data sent successfully:', this.userForm.value);
        this.loadUsers();
        this.userForm.reset();
        this.visible = false;
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
        console.error(error);
        //Validation errors returned from API
        const apiErrors = error.error.errors;
        this.handleApiErrors(apiErrors);
      }
    );
  }

  // console.log(this.userForm.getRawValue());

  submitEditUserForm() {
    this.formService.getSelectedId().subscribe((id) => {
      this.featuresService
        .updateUserData(id, this.updateUserForm.value)
        .subscribe(
          (response) => {
            console.log('Data updated successfully', response);
            //this.featuresService.getProjects();
            this.visibleEdit = false;
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

            //Validation errors returned from API
            const apiErrors = error.error.errors;
            this.handleApiErrors(apiErrors);
          }
        );
    });
  }

  deleteUser() {
    this.formService.deleteAction$.subscribe((id) => {
      if (id !== null) {
        this.featuresService.deleteUser(id).subscribe((response) => {
          console.log('Delete User with ID: ', response);
          this.loadUsers();
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
      const formControl = this.userForm.get(controlName);
      if (formControl) {
        formControl.setErrors({ apiError: apiErrors[controlName][0] });
      }
    });
  }
}
