import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _employee: any[] = [];

  set employee(employee: any[]) {
    this._employee = employee;
  }
  get employee(): any[] {
    return this._employee
  }

  constructor() { }
}
