import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Department } from 'src/app/interface/department';
import { FeaturesService } from 'src/app/services/features.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],

})
export class GridComponent {
  @Input() tableHeading: string[] = [];
  @Input() data: any[] = [];
  @Input() formDepartment!: FormGroup

  visible: boolean = false
  checks: boolean = false;

  constructor(private loader: LoaderService, private featuresService: FeaturesService,private location:Location) {
  }

  ngOnInit() {
    
  }
  submitForm() {
    if (this.formDepartment.valid) {
      const formData = this.formDepartment.value;
      this.featuresService.setFormData(formData);
    }
  }

  bulk(e: any) {
    if (e.target.checked == true) {
      this.checks = true
    }
    else {
      this.checks = false
    }
  }

  editItem(data: any): void {
    console.log('Edit clicked for data:', data);
  }

  deleteItem(id: number): void {
    console.log('Deleting department with ID:', id);
      this.featuresService.deleteDepartment(id).subscribe(
        response => {
          console.log('Department deleted successfully:', response);
          window.location.reload();
        },
        error => {
          console.error('Error deleting department:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
    
  }

  getDataProperties(data: Department): string[] {
    return Object.keys(data)
  }


  showDialog() {
    this.visible = true;
  }
}