import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private attendanceUrl = 'https://hub.dummyapis.com/employee?noofRecords=20&idStarts=1001'

  private _data: any[] = [];

  constructor(private http: HttpClient) { }

  set data(data: any[]) {
    this._data = data;
  }
  get data(): any[] {
    return this._data
  }

  getAttendanceData(): Observable<any[]> {
    return this.http.get<any[]>(this.attendanceUrl);
  }


}
