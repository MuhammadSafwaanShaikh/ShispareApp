import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private baseUrl = 'http://13.228.165.0/api';
  private authToken: string | null;

  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.authToken,
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(error);
  }

  getList(endpoint: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http
      .get<any[]>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  create(endpoint: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .post(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  update(endpoint: string, id: any, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/${endpoint}/${id}/update`, data, { headers })
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  delete(endpoint: string, id: number | null): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}/delete`, {
      headers,
    });
    // .pipe(
    //   catchError((error) => {
    //     return this.handleError(error);
    //   })
    // );
  }
}
