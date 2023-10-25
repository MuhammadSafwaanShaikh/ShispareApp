import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projectTableHeading: string[] = ['ID', 'Name', 'Created At','Action'];
  @Input() projects: any[] = [];
  newProject: any = {};
  visible = false;
 

  
  constructor(public dataService: DataService) { }
  ngOnInit(): void {
    this.loadProjects();
   
   
   
  
}



// loadProjects() {
//   console.log('loading')
//   this.dataService.getProjects().subscribe(
//     (response: any) => {
//       if (response && response.projects) {
//         const extractedData = [];

//         for (const project of response.projects) {
//           // Create a new object with the desired properties
//           const extractedProject = {
//             ID: project.id,
//             Name: project.project,
//             CreatedAt: project.created_at,
//             // You can add more properties here as needed
//           };

//           extractedData.push(extractedProject);
//         }

//         this.projects = extractedData;
//       } else {
//         console.error('API response is missing projects or is in an unexpected format.');
//       }
//     },
//     (error) => {
//       console.error('Error loading projects:', error);
//     }
//   );
// }

// loadProjects() {
//   console.log('Loading projects');

//   this.dataService.getProjects().subscribe(
//     (response: any) => {
//       if (response && Array.isArray(response.projects)) {
//         this.projects = response.projects.map((project: any) => ({
//           ID: project.id,
//           Name: project.project,
//           CreatedAt: project.created_at,
//           Status: project.status,
//           // Add more properties as needed
//         }));
//       } else {
//         console.error('API response is missing projects array or is in an unexpected format:', response);
//         this.projects = [];
//       }
//     },
//     (error) => {
//       console.error('Error loading projects:', error);
//       this.projects = []; // Handle the error by setting projects to an empty array or handle it according to your needs.
//     }
//   );
// }

loadProjects() {
  this.dataService.getProjects().subscribe(
    (response: any) => {
      if (response && response.projects) {
        const transformedData: any[] = [];
        for (const item of response.projects) {
          transformedData.push({
            id: item.id,
            project: item.project,
            created_at: item.created_at,
          });
        }
        this.projects = transformedData;
      } else {
        console.error(
          'API response is missing departments or is in an unexpected format.'
        );
      }
    },
    (error) => {
      console.error('Error loading departments:', error);
    }
  );
}








}