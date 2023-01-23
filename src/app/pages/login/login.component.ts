/*
Title: login.component.ts
Author: William Watlington
Date: 14 January 2023
Description: login component of nodebucket app
*/


// imports
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/shared/models/employee.interface';
import { EmployeeService } from '../../shared/services/employee.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employee: Employee;
  errorMessages: Message[] = []; // array to hold error messages for primeng

  // initialize form and validate num only input
  loginForm: FormGroup = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  })

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService,
    private http: HttpClient, private employeeService: EmployeeService) {
      this.employee = {} as Employee;
     }

  ngOnInit(): void {
  }

  login() {
    const empId = this.loginForm.controls['empId'].value; // get employee id from user input

    // calls shared employee service find function to use employee api
    this.employeeService.findEmployeeById(empId).subscribe({
      next: (res) => {
        // if employee id found by api, set login cookies to authorize user, otherwise return error for primeng to display
        if(res) {
          console.log(res);
          this.employee = res;
          this.cookieService.set('session_user', this.employee.empId.toString(), 1);
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate(['/']);
        } else {
          this.errorMessages= [
            { severity: 'error', summary: 'error', detail: 'please enter valid employee id to continue.'}
          ]
        }
      },
      error: (e) => {
        console.log(e);
        this.errorMessages = [
          { severity: 'error', summary: 'error', detail: e.message }
        ]
      }
    })
  }

}
