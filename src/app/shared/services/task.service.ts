/*
Title: task.service.ts
Author: William Watlington
Date: 20 January 2023
Description: task service for nodebucket app
*/

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultGridAutoDirective } from '@angular/flex-layout';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  createTask(empId: number, title: string, dueDate: number): Observable<any> {
    console.log(`empID: ${empId} task: ${title} dueDate:${dueDate}`);
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: title,
      dueDate: dueDate
    })
  }

  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }
}
