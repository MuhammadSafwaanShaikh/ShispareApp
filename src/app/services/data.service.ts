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
      // getAttendanceData(): Observable<any[]> {
      //   const apiUrl = 'https://hub.dummyapis.com/employee?noofRecords=20&idStarts=1001';

      //   return this.http.get<any[]>(apiUrl);
      // }

        // Login a user
  // login(email: string, password: string) {
  //   const url = `${this.baseUrl}/login`;
  //   return this.http.post(url, { email, password });
  // }
  login(email: string, password: string) {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password });
  }

  // Register a new user
  register( name: string, email: string, password: string) {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, {name, email, password });
  }

  // Create: Add a new department
 

  
  // Read: Get a list of departments
  // getDepartments(): Observable<any[]> {
  //   const headers = this.getHeaders();
  //   const url = `${this.baseUrl}/departments`;
  //   return this.http.get<any[]>(url,{headers});
    
  // }
  getDepartments(): Observable<any[]> {
    // Check if authToken is available before setting the header
    const headers = this.getHeaders();
    if (this.authToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authToken,
      });
  
      return this.http.get<any[]>(`${this.baseUrl}/departments`, { headers });
    } else {
      // Handle the case where authToken is not available (e.g., show an error or redirect to the login page).
      // You should implement your own logic based on your application's requirements.
      return throwError('Authentication token is missing');
    }
  }
  

  // Read: Get a single department by ID
  getDepartmentById(id: number): Observable<any> {
    const url = `${this.baseUrl}/department/${id}`;
    return this.http.get(url);
  }

    // Update: Update a department by ID
    // updateDepartment(id: number, departmentData: any): Observable<any> {
    //   const url = `${this.baseUrl}/department/${id}/update`;
    //   return this.http.put(url, departmentData);
    // }

    // deleteDepartment(id: number): Observable<any> {
    //   const url = `${this.baseUrl}/department/${id}/delete`;
    //   return this.http.delete(url);
    // }
    deleteDepartment(id: number): Observable<any> {
      const url = `${this.baseUrl}/department/${id}/delete`;
      const headers = this.getHeaders();
      return this.http.delete(url,headers)
        .pipe(
          catchError((error: any) => {
            console.error('Error deleting department:', error);
            // Handle the error here, e.g., display an error message to the user
            return throwError(error);
          })
        );
    }
    
    // createDepartment(departmentData: any): Observable<any> {
      
    //   const url = `${this.baseUrl}/departmentstore`;
    //   console.log(url);
    //   return this.http.post(url, departmentData);
    // }
    createDepartment(departmentData: any): Observable<any> {
      const url = `${this.baseUrl}/departmentstore`;
    
      // Assuming departmentData is an object containing department information
      const headers = this.getHeaders(); // If you need to include authorization headers
    
      return this.http.post(url, departmentData,  headers ).pipe(
        map((response: any) => {
          // Handle the response as needed
          // Assuming the API returns the newly created department data
          // You can also perform any additional processing here
          this.employee.push(response);
          return response;
        }),
        catchError((error: any) => {
          // Handle errors here
          console.error('Error creating department:', error);
          return throwError(error);
        })
      );
    }
    
    // postToApi(departmentData: any): Observable<any> {
    //   const url = `${this.baseUrl}/departmentstore`;
    //   const headers = this.getHeaders(); // Get the headers with the authorization token
    
    //   return this.http.post(url, departmentData, headers); // Include the headers in the POST request
    // }

    updateDepartment(id: number, departmentData: any): Observable<any> {
      const url = `${this.baseUrl}/department/${id}/update`;
      return this.http.put(url, departmentData);
    }

    // postToApi(url: string, data: any): Observable<any> {
    //   return this.http.post(url, data);
    // }
    

    //PROJECT COMPONENT APIS

    getProjects(): Observable<any[]> {
      const url = `${this.baseUrl}/projects`;
      const headers = this.getHeaders();
  
      return this.http.get<any[]>(url, headers).pipe(
        map((response: any) => {
          // Handle the response as needed
          // You can add any additional processing here
          return response;
        }),
        catchError((error: any) => {
          // Handle errors here
          console.error('Error loading projects:', error);
          return throwError(error);
        })
      );
    }
    
  

    
  }


    
