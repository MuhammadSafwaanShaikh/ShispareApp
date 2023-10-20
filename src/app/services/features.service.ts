import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private departmentsUrl = 'http://13.228.165.0/api/departments'
  private registerUrl = 'http://13.228.165.0/api/register'
  private loginUrl = 'http://13.228.165.0/api/login'
  private departmentStoreUrl = 'http://13.228.165.0/api/departmentstore'
  private departmentdeleteUrl = 'http://13.228.165.0/api/department'
  private _data: any[] = [];
  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();
  private authToken: string | null;

  constructor(private http: HttpClient) { this.authToken = localStorage.getItem('token'); }

  set data(data: any[]) {
    this._data = data;
  }
  get data(): any[] {
    return this._data
  }
  
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData)
  }

  loginUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }
  getDepartments(): Observable<any[]> {
    if (this.authToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authToken,
      });
      return this.http.get<any[]>(this.departmentsUrl, { headers });
    } else {
      return throwError('Token is missing');
    }
  }


addDepartmentData(departData: any): Observable<any> {
    if (this.authToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authToken,
      });
    return this.http.post(this.departmentStoreUrl, departData,{headers})
    }
    else {
      return throwError('Token is missing'); 
  }
}

updateDepartmentData(id: number|null,data:any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  
  const updateUrl = `${this.departmentdeleteUrl}/${id}/update`;
  return this.http.put(updateUrl,data,{headers})
}


deleteDepartment(id:number): Observable<any>{
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  const deleteUrl = `${this.departmentdeleteUrl}/${id}/delete`;
  return this.http.delete(deleteUrl, { headers }).pipe(
    catchError(error => {
      console.error('Error deleting department:', error);
      throw error;
    })
  );;
}

  setFormData(formData: any) {
    this.formDataSubject.next(formData);
  }
}

