import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeaturesService } from 'src/app/services/features.service';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  departmentTableHeading: string[] = ['ID', 'Department Name']
  @Input() departData: any[] = [];
  departmentData!: FormGroup

  constructor(private featuresService: FeaturesService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.featuresService.getAttendanceData().subscribe(
    //   data => {
    //     console.log(data);
    //     this.attendanceData = data;
    //   },
    //   error => {
    //     console.error('Error fetching attendance data:', error);
    //   }
    // );
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
          this.departData = response.departments;
        } else {
          console.error('API response is missing departments or is in an unexpected format.');
        }
      },
      (error) => {
        console.error('Error loading departments:', error);
      }
    );
  }


}

