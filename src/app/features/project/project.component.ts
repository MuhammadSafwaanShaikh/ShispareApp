import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projectTableHeading: string[] = ['ID', 'Name', 'Created At'];
  @Input() projects: any[] = [];
  newProject: any = {};
  visible = false;

  
  constructor(public dataService: DataService) { }
  ngOnInit(): void {
    this.loadProjects();
  
}



loadProjects() {
  console.log('loding')
  this.dataService.getProjects().subscribe(
    (response: any) => {
      if (response && response.projects) {
        const extractedData = [];

        for (const project of response.projects) {
          // Create a new object with the desired properties
          const extractedProject = {
            ID: project.id,
            Name: project.project,
            CreatedAt: project.created_at,
            // You can add more properties here as needed
          };

          extractedData.push(extractedProject);
        }

        this.projects = extractedData;
      } else {
        console.error('API response is missing projects or is in an unexpected format.');
      }
    },
    (error) => {
      console.error('Error loading projects:', error);
    }
  );
}






}