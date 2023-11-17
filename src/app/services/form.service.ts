import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private form!: FormGroup;
  private updateForm!: FormGroup;
  private selectedIdSubject = new BehaviorSubject<number | null>(null);
  private deleteIdSubject = new BehaviorSubject<number | null>(null);
  private dialogVisibilitySubject = new BehaviorSubject<boolean>(false);
  dialogVisibility$ = this.dialogVisibilitySubject.asObservable();

  deleteAction$ = this.deleteIdSubject.asObservable();

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.createUpdateForm();
  }

  deleteData(id: number) {
    this.deleteIdSubject.next(id);
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      department_id: ['', Validators.required],
      designation_id: ['', Validators.required],
      project_id: ['', Validators.required],
      report_to_id: ['', [Validators.required]],
      report_to_name: ['', [Validators.required]],
      report_to: ['', [Validators.required]],
      status: ['', [Validators.required]],
      project: ['', [Validators.required]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });
  }

  getForm() {
    return this.form;
  }

  getFormData() {
    return this.form.value;
  }

  private createUpdateForm() {
    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      department_id: ['', Validators.required],
      designation_id: ['', Validators.required],
      project_id: ['', Validators.required],
      report_to: ['', Validators.required],
      report_to_id: ['', [Validators.required]],
      report_to_name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      project: ['', [Validators.required]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
    });
  }

  getUpdateForm() {
    return this.updateForm;
  }

  getUpdateFormData() {
    return this.updateForm.value;
  }

  setSelectedId(id: any) {
    this.selectedIdSubject.next(id);
  }

  getSelectedId() {
    return this.selectedIdSubject.asObservable();
  }

  setDialogVisibility(visibleEdit: boolean) {
    this.dialogVisibilitySubject.next(visibleEdit);
  }

  deleteItem(id: number) {
    this.deleteIdSubject.next(id);
  }
}
