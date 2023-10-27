import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [MessageService],
})
export class GridComponent {
  @Input() tableHeading: string[] = [];
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
  checks: boolean = false;

  constructor(
    private formService: FormService,
    private messageService: MessageService
  ) {
    this.form = formService.getForm();
    this.updateForm = formService.getUpdateForm();
  }

  ngOnInit() {}

  onSubmit() {
    this.submitFormEvent.emit(this.form.value);
    this.visible = false;
  }

  submitEditForm(id: any) {
    this.submitEditFormEvent.emit(this.updateForm.value);
    this.visibleEdit = false;
  }

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

  getDataProperties(data: any): string[] {
    return Object.keys(data);
  }

  showDialog() {
    this.visible = true;
  }

  showDialogEdit(data: any) {
    this.selectedId = data.id;
    this.updateForm.patchValue({
      department: data.department,
    });
    this.updateForm.patchValue({
      project: data.project,
    });
    this.updateForm.patchValue({
      designation: data.designation,
    });
    this.visibleEdit = true;
    this.formService.setSelectedId(this.selectedId);
  }

  //*ToastService

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Added Successfully',
    });
  }
  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Updated',
      detail: 'Updated Successfully',
    });
  }
  showDelete() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Deleted Successfully',
    });
  }
}
