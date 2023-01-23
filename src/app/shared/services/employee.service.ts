/*
Title: employee.service.ts
Author: William Watlington
Date: 14 January 2023
Description: employee service for finding employee by id
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // takes empId, attempts to get employee document from employee api, returns result
  findEmployeeById(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId);
  }
}
