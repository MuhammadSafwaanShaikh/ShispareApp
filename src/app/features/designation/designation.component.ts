import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent {

  attendanceTableHeading: string[] = ['Desigantion','ID','created_at','Action' ];
  @Input() DesignationData:any[]=[];


  constructor(private dataService: DataService) {}

  ngOnInit(){
    this.loadDesignations();
    
  }

  loadDesignations() {
    this.dataService.getDesignations().subscribe(
      (response: any) => {
        if (response && response.designations) {
          const extractedData = [];
  
          for (const designation of response.designations) {
            // Create a new object with the desired properties
            const extractedDesignation = {
              Designation: designation.designation,
              ID: designation.id,
              created_at: designation.created_at,
              // Add other properties if needed
            };
  
            extractedData.push(extractedDesignation);
          }
  
          this.DesignationData = extractedData;
        } else {
          console.error('API response is missing designations or is in an unexpected format.');
        }
      },
      (error) => {
        console.error('Error loading designations:', error);
      }
    );
  }
  

}
