import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() data: any[] = [];
  @Input() dataFromUserProj: any[] = [];
  @Input() dataFromUserDepart: any[] = [];
  @Input() dataFromUserDesig: any[] = [];
  @Input() form!: FormGroup;
  @Input() updateForm!: FormGroup;
  @Input() controlName: string = '';
  selectedId: any;
  @Output() submitFormEvent = new EventEmitter();
  @Output() submitEditFormEvent = new EventEmitter();
  selectedCountry: string | undefined;
  visible: boolean = false;
  visibleEdit: boolean = false;
  @Input() selectedData: any;
  @Input() apiErrors: any;
  formControl: FormControl = new FormControl();

  private subscription: Subscription = new Subscription();

  constructor(
    private formService: FormService,
    private messageService: MessageService
  ) {
    this.form = formService.getForm();
    this.updateForm = formService.getUpdateForm();
  }

  ngOnInit() {
    this.formService.dialogVisibility$.subscribe((visibleEdit) => {
      this.visibleEdit = visibleEdit;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.formService.setDialogVisibility(false);
  }
  onSubmit() {
    this.submitFormEvent.emit(this.form.value);
    this.visible = false;
  }

  submitEditForm(id: any) {
    this.submitEditFormEvent.emit(this.updateForm.value);
    this.visibleEdit = false;
  }

  deleteItem(id: number) {
    this.formService.deleteItem(id);
    this.visible = false;
  }

  showDialog() {
    this.visible = true;
  }
  resetForm() {
    this.form.reset();
  }

  // showDialogEdit(data: any) {
  //   this.selectedId = data.id;
  //   console.log(data);
  //   // this.updateForm.patchValue(data);
  //   this.updateForm.patchValue({
  //     department: data.department,
  //   });
  //   this.updateForm.patchValue({
  //     project: data.project,
  //   });
  //   this.updateForm.patchValue({
  //     designation: data.designation,
  //   });
  //   this.updateForm.patchValue({
  //     name: data.name,
  //     email: data.email,
  //     status: data.status,
  //     department_id: data.department_id,
  //     report_to: data.report_to,
  //   });
  //   console.log(this.updateForm.value);

  //   this.formService.setSelectedId(this.selectedId);
  // }

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
