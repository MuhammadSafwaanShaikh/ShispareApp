    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
    import { throwError } from 'rxjs';
    import { catchError } from 'rxjs/operators';
    import { map } from 'rxjs/operators';
    


    @Injectable({
      providedIn: 'root'
    })
    export class DataService {
      private dashboardTableHeading: string[] = [];
      private recruitmentTableHeading:string[]=[];
      private _employee: any[] = [];
      private attendanceTableHeading:string[]=[];
      private baseUrl = 'http://13.228.165.0/api';
      private authToken: string | null;  
      newDepartment: any = {};


      set employee(employee: any[]) {
        this._employee = employee;
      }
      get employee(): any[] {
        return this._employee
      }
      
      getDashboardTableHeading(): string[] {
        return this.dashboardTableHeading;
      }
      getrecruitmentTableHeading():string[]{
        return this.recruitmentTableHeading;
      }
      getattendanceTableHeading():string[]{
        return this.attendanceTableHeading
      }

      constructor(private http: HttpClient) { 
        this.authToken = localStorage.getItem('token');
       }
       private getHeaders() {
        // Create headers with the authorization token if it's not null
        const headers = this.authToken
          ? new HttpHeaders({
              'Authorization': `Bearer ${this.authToken}`
            })
          : new HttpHeaders();
      
        return { headers };
      }

      //LOGIN COMPONENT APIS
     
  login(email: string, password: string) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password });
  }
  register( name: string, email: string, password: string) {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, {name, email, password });
  }
 

  //DEPARTMENT COMPONENT APIS

  getDepartments(): Observable<any[]> {
    const headers = this.getHeaders();
    if (this.authToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authToken,
      });
  
      return this.http.get<any[]>(`${this.baseUrl}/departments`, { headers });
    } else {
      return throwError('Authentication token is missing');
    }
  }

    deleteDepartment(id: number): Observable<any> {
      const url = `${this.baseUrl}/department/${id}/delete`;
      const headers = this.getHeaders();
      return this.http.delete(url,headers)
        .pipe(
          catchError((error: any) => {
            console.error('Error deleting department:', error);
            return throwError(error);
          })
        );
    }
    
   
    createDepartment(departmentData: any): Observable<any> {
      const url = `${this.baseUrl}/departmentstore`;
      const headers = this.getHeaders(); 
      return this.http.post(url, departmentData,  headers ).pipe(
        map((response: any) => {
          this.employee.push(response);
          return response;
        }),
        catchError((error: any) => {
          console.error('Error creating department:', error);
          return throwError(error);
        })
      );
    }
    
 
    updateDepartment(id: number, departmentData: any): Observable<any> {
      const url = `${this.baseUrl}/department/${id}/update`;
      const headers = this.getHeaders();
      return this.http.put(url, departmentData,  headers ); 
    }
    


    //PROJECT COMPONENT APIS

  

    getProjects(): Observable<any[]> {
      if (this.authToken) {
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + this.authToken,
        });
        return this.http.get<any[]>(`${this.baseUrl}/projects`, { headers });
      } else {
        return throwError('Token is missing');
      }
    }

    createProject(projectData: any): Observable<any> {
      const url = `${this.baseUrl}/projectstore`;
      const headers = this.getHeaders(); 
  
      return this.http.post(url, projectData, headers).pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          console.error('Error creating project:', error);
          return throwError(error);
        })
      );
    }
 
    updateProject(id: number, projectData: any): Observable<any> {
      const url = `${this.baseUrl}/project/${id}/update`;
      const headers = this.getHeaders(); 
      return this.http.put(url, projectData,  headers ).pipe(
      );
    }

    deleteProject(id: number): Observable<any> {
      const url = `${this.baseUrl}/project/${id}/delete`;
      const headers = this.getHeaders();
      return this.http.delete(url,headers);
    }
    


    //DESIGNATION COMPONENT APIS
    // Designation Component CRUD Functions

getDesignations(): Observable<any[]> {
  if (this.authToken) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authToken,
    });
    return this.http.get<any[]>(`${this.baseUrl}/designations`, { headers });
  } else {
    return throwError('Token is missing');
  }
}

createDesignation(designationData: any): Observable<any> {
  const url = `${this.baseUrl}/designationstore`;
  const headers = this.getHeaders();

  return this.http.post(url, designationData, headers).pipe(
    map((response: any) => {
      return response;
    }),
    catchError((error: any) => {
      console.error('Error creating designation:', error);
      return throwError(error);
    })
  );
}

updateDesignation(id: number, designationData: any): Observable<any> {
  const url = `${this.baseUrl}/designation/${id}/update`;
  const headers = this.getHeaders();
  return this.http.put(url, designationData, headers).pipe();
}

deleteDesignation(id: number): Observable<any> {
  const url = `${this.baseUrl}/designation/${id}/delete`;
  const headers = this.getHeaders();
  return this.http.delete(url, headers);
}












    
  }
    

    
    
    
    
    
    
  

    
  


    
