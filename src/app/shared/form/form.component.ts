import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DynamicFormControl } from 'src/app/interface/dynamicFormControls';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Input() dataFromUserProj: any[] = [];
  @Input() dataFromUserDepart: any[] = [];
  @Input() dataFromUserDesig: any[] = [];
  @Input() form!: FormGroup;
  @Input() updateForm!: FormGroup;
  @Input() controlName: string = '';
  selectedId: any;
  @Output() submitFormEvent = new EventEmitter();
  @Output() submitEditFormEvent = new EventEmitter();
  visible: boolean = false;
  visibleEdit: boolean = false;
  private subscription: Subscription = new Subscription();

  @Input() formModel: DynamicFormControl[] = [];
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
    if (this.form.valid) {
      this.submitFormEvent.emit(this.form.value);
      this.visible = false;
    }
    console.log('Form status:', this.form.status);
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
}
