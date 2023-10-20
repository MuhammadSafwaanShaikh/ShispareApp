import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeaturesService } from 'src/app/services/features.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  departmentTableHeading: string[] = ['ID', 'Department Name','Created At',
'Updated At','Action']
  @Input() departData: any[] = [];
  departmentData!: FormGroup

  constructor(private featuresService: FeaturesService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadDepartments();

    this.departmentData = this.formBuilder.group({
      department: '',
    });

    this.featuresService.formData$.subscribe(formData => {
      if (formData) {

        console.log('Received form data in department component:', formData);

        this.featuresService.addDepartmentData(formData).subscribe(
          response => {
            console.log('Data sent successfully:', response);
            window.location.reload();
          },
          error => {
            console.error('Error sending data:', error);
            
          }
        );
      }
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
              created_at:item.created_at,
              updated_at:item.updated_at,
            
            });
          }
  
          this.departData = transformedData;
        } else {
          console.error('API response is missing departments or is in an unexpected format.');
          // Handle the error case as appropriate
        }
      },
      (error) => {
        console.error('Error loading departments:', error);
      }
    );
  }
  



}

