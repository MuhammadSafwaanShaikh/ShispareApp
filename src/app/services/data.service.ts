import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dashboardTableHeading: string[] = [];
  private recruitmentTableHeading: string[] = [];
  private _employee: any[] = [];

  set employee(employee: any[]) {
    this._employee = employee;
  }
  get employee(): any[] {
    return this._employee
  }

  getDashboardTableHeading(): string[] {
    return this.dashboardTableHeading;
  }
  getRecruitmentTableHeading(): string[] {
    return this.recruitmentTableHeading;
  }
  constructor() { }
}
