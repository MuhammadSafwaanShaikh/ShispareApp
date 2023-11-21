import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class FeaturesService {
  private registerUrl = 'http://13.228.165.0/api/register';
  private loginUrl = 'http://13.228.165.0/api/login';
  private _data: any[] = [];
  authToken: string | null;

  constructor(private http: HttpClient, private crudService: CrudService) {
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

  logoutUser(): void {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');
    // Add any additional cleanup logic here
  }

  //! Projects API

  getProjects(): Observable<any[]> {
    return this.crudService.getList('projects');
  }
  addProjectsData(projData: any): Observable<any> {
    return this.crudService.create('projectstore', projData);
  }
  updateProjectData(id: any | null, data: any): Observable<any> {
    return this.crudService.update('project', id, data);
  }
  deleteProject(id: number | null): Observable<any> {
    return this.crudService.delete('project', id);
  }

  //! Deparments API

  getDepartments(): Observable<any[]> {
    return this.crudService.getList('departments');
  }
  addDepartmentData(departData: any): Observable<any> {
    return this.crudService.create('departmentstore', departData);
  }
  updateDepartmentData(id: any | null, data: any): Observable<any> {
    return this.crudService.update('department', id, data);
  }
  deleteDepartment(id: number | null): Observable<any> {
    return this.crudService.delete('department', id);
  }

  //! Designations API

  getDesignations(): Observable<any[]> {
    return this.crudService.getList('designations');
  }
  addDesignationData(desigData: any): Observable<any> {
    return this.crudService.create('designationstore', desigData);
  }
  updateDesignationData(id: any | null, data: any): Observable<any> {
    return this.crudService.update('designation', id, data);
  }
  deleteDesignation(id: number | null): Observable<any> {
    return this.crudService.delete('designation', id);
  }
  //! Users API
  getUsers(): Observable<any[]> {
    return this.crudService.getList('users');
  }
  addUserData(userData: any): Observable<any> {
    return this.crudService.create('userstore', userData);
  }
  updateUserData(id: any | null, data: any): Observable<any> {
    return this.crudService.update('user', id, data);
  }
  deleteUser(id: any | null): Observable<any[]> {
    return this.crudService.delete('user', id);
  }
}
