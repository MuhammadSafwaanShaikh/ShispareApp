import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { MessageService } from 'primeng/api';
import { DynamicFormControl } from 'src/app/interface/dynamicFormControls';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [MessageService],
})
export class GridComponent {
  @Input() tableHeading: string[] = [];
  @Input() data: any[] = [];
  @Input() updateForm!: FormGroup;

  selectedId: any;

  selectedCountry: string | undefined;
  visible: boolean = false;
  visibleEdit: boolean = false;
  checks: boolean = false;
  constructor(
    private formService: FormService,
    private messageService: MessageService
  ) {
    this.updateForm = formService.getUpdateForm();
  }
  ngOnInit() {}

  bulk(e: any) {
    if (e.target.checked == true) {
      this.checks = true;
    } else {
      this.checks = false;
    }
  }

  deleteItem(id: number) {
    this.formService.deleteItem(id);
    this.visible = false;
  }

  // getDataProperties(data: any): string[] {
  //   return Object.keys(data);
  // }

  getDataProperties(data: any): string[] {
    // List of properties to exclude from the table
    const excludedProperties = [
      'department_id',
      'project_id',
      'designation_id',
      'report_to_id',
    ];

    const allProperties = Object.keys(data);
    const visibleProperties = allProperties.filter(
      (property) => !excludedProperties.includes(property)
    );

    return visibleProperties;
  }

  // getProperty(data: any, propertyPath: string): any {
  //   const properties = propertyPath.split('.');
  //   let value = data;
  //   for (const prop of properties) {
  //     if (value && value.hasOwnProperty(prop)) {
  //       value = value[prop];
  //     } else {
  //       return null; // or handle this case accordingly
  //     }
  //   }
  //   return value;
  // }

  // showDialog() {
  //   this.visible = true;
  // }

  showDialogEdit(data: any) {
    this.formService.setDialogVisibility(true);
    this.selectedId = data.id;

    this.updateForm.patchValue({
      name: data.name,
      email: data.email,
      status: data.status,
      department: data.department,
      project: data.project,
      designation: data.designation,
      department_id: data.department_id,
      designation_id: data.designation_id,
      project_id: data.project_id,
      // report_to_id: data.report_to_id,
      report_to: data.report_to_id,
    });
    this.formService.setSelectedId(this.selectedId);
    console.log(this.updateForm.value);
    console.log(data);
  }

  //*ToastService

  // show() {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Success',
  //     detail: 'Added Successfully',
  //   });
  // }
  // showInfo() {
  //   this.messageService.add({
  //     severity: 'info',
  //     summary: 'Updated',
  //     detail: 'Updated Successfully',
  //   });
  // }
  // showDelete() {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Success',
  //     detail: 'Deleted Successfully',
  //   });
  // }
}
