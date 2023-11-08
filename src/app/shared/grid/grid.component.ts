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
  @Input() updateForm!: FormGroup;

  selectedId: any;

  selectedCountry: string | undefined;
  visible: boolean = false;
  visibleEdit: boolean = false;
  checks: boolean = false;

  constructor(private formService: FormService) {
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

  getDataProperties(data: any): string[] {
    return Object.keys(data);
  }

  showDialog() {
    this.visible = true;
  }

  showDialogEdit(data: any) {
    this.formService.setDialogVisibility(true);

    this.selectedId = data.id;
    console.log(data);
    this.updateForm.patchValue(data);
    this.formService.setSelectedId(this.selectedId);
  }
}
