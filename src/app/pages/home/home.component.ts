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
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  itemToDelete: string;

  taskForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])],
    dueDate: [null, Validators.compose([Validators.required])]
  })

  constructor(private taskService: TaskService, private cookieService: CookieService, private fb: FormBuilder) {
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];
    this.itemToDelete = "";

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

  // shows the delete confirmation modal
  showDeleteModal(id: string) {
    this.itemToDelete = id;
    const deleteModal = document.getElementById('delete-modal-background');
    if(deleteModal) {
      deleteModal.style.visibility = 'visible';
    }
  }

  // hides the delete confirmation modal
  hideDeleteModal() {
    this.itemToDelete = "";
    const deleteModal = document.getElementById('delete-modal-background');
    if(deleteModal) {
      deleteModal.style.visibility = 'hidden';
    }
  }

  // function to delete task using task service
  deleteTask() {
    console.log('deleting item ' + this.itemToDelete + " from employee " + this.empId);
    this.taskService.deleteTask(this.empId, this.itemToDelete).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    })
  }


  // drop event function
  drop(event: CdkDragDrop<any[]>) {
    // reordering array if item moved to new position in same array
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskList(this.empId, this.todo, this.done);
    }
    // transferring array item if item is moved to new list
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  // function for updating a task list using the task service
  updateTaskList(empId: number, todo: Item[], done: Item[]) {
    this.taskService.updateTask(empId, todo, done).subscribe({
      next: (res) => {
        this.employee = res;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    })
  }
}

