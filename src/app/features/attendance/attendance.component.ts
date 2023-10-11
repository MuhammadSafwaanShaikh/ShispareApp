import { Component, Input } from '@angular/core';
import { FeaturesService } from 'src/app/services/features.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  attendanceTableHeading: string[] = ['First Name', 'ID', 'Last Name', 'Age', 'Address', 'DOB', 'Action']
  @Input() attendanceData: any[] = [];

  ngOnInit() {
    this.featuresService.getAttendanceData().subscribe((data) => {
      this.attendanceData = data.map((item) => {
        return {
          'First Name': item.firstName,
          'ID': item.id,
          'Last name': item.lastName,
          'Age': item.age,
          'Address': item.address,
          'DOB': item.dob,
        };
      });
    })
  }
  constructor(private featuresService: FeaturesService) { }


}

