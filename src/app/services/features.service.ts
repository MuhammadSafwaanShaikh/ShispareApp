import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {
  private registerUrl = 'http://13.228.165.0/api/register';
  private loginUrl = 'http://13.228.165.0/api/login';
  private departmentdeleteUrl = 'http://13.228.165.0/api/department';
  private baseUrl = 'http://13.228.165.0/api';
  private _data: any[] = [];
  private authToken: string | null;

  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('token');
  }

  set data(data: any[]) {
    this._data = data;
  }
  get data(): any[] {
    return this._data;
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

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
  addProjectsData(projData: any): Observable<any> {
    if (this.authToken) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken,
      });
      return this.http.post(`${this.baseUrl}/projectstore`, projData, {
        headers,
      });
    } else {
      return throwError('Token is missing');
    }
  }
  updateProjectData(id: any | null, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.baseUrl}/project/${id}/update`, data, {
      headers,
    });
  }
  deleteProject(id: number | null): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .delete(`${this.baseUrl}/project/${id}/delete`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error deleting project:', error);
          throw error;
        })
      );
  }

  getDepartments(): Observable<any[]> {
    if (this.authToken) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken,
      });
      return this.http.get<any[]>(`${this.baseUrl}/departments`, { headers });
    } else {
      return throwError('Token is missing');
    }
  }
  addDepartmentData(departData: any): Observable<any> {
    if (this.authToken) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken,
      });
      return this.http.post(`${this.baseUrl}/departmentstore`, departData, {
        headers,
      });
    } else {
      return throwError('Token is missing');
    }
  }
  updateDepartmentData(id: any | null, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.baseUrl}/department/${id}/update`, data, {
      headers,
    });
  }
  deleteDepartment(id: number | null): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .delete(`${this.baseUrl}/department/${id}/delete`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error deleting department:', error);
          throw error;
        })
      );
  }

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

  addDesignationData(desigData: any): Observable<any> {
    if (this.authToken) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken,
      });
      return this.http.post(`${this.baseUrl}/designationstore`, desigData, {
        headers,
      });
    } else {
      return throwError('Token is missing');
    }
  }

  updateDesignationData(id: any | null, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.baseUrl}/designation/${id}/update`, data, {
      headers,
    });
  }

  deleteDesignation(id: number | null): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .delete(`${this.baseUrl}/designation/${id}/delete`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error deleting department:', error);
          throw error;
        })
      );
  }
}
