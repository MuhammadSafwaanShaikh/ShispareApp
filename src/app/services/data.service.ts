import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dashboardTableHeading: string[] = [];
  private recruitmentTableHeading:string[]=[];
  private _employee: any[] = [];
  private attendanceTableHeading:string[]=[];

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

  constructor() { }
}
