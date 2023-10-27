import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private form!: FormGroup;
  private updateForm!: FormGroup;
  private selectedIdSubject = new BehaviorSubject<number | null>(null);
  private deleteIdSubject = new BehaviorSubject<number | null>(null);
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
      project: [''],
      department: [''],
      designation: [''],
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
      project: [''],
      department: [''],
      designation: [''],
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

  deleteItem(id: number) {
    this.deleteIdSubject.next(id);
  }
}
