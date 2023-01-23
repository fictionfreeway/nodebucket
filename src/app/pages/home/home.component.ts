/*
Title: home.component.ts
Author: William Watlington
Date: 16 January 2023
Description: home component for nodebucket app
*/

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/models/employee.interface';
import { Item } from 'src/app/shared/models/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  taskForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])],
    dueDate: [null, Validators.compose([Validators.required])]
  })

  constructor(private taskService: TaskService, private cookieService: CookieService, private fb: FormBuilder) {
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];

    // get empId from cookie generated on login
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    this.taskService.findAllTasks(this.empId).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    })
  }

  ngOnInit(): void {
  }

  // get task values from form and create new task with task service
  createTask() {
    const newTask = this.taskForm.controls['text'].value;
    const dueDate = this.taskForm.controls['dueDate'].value;

    this.taskService.createTask(this.empId, newTask, dueDate).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    })
  }

  // show new task modal when new task button is clicked
  showModal() {
    const newTaskForm = document.getElementById('new-task-background');
    if(newTaskForm) {
      newTaskForm.style.visibility = "visible";
    }
  }

  // hide new task modal when background of new task modal is clicked
  hideModal() {
    const newTaskForm = document.getElementById('new-task-background');
    if(newTaskForm) {
      newTaskForm.style.visibility = "hidden";
    }
  }
}

