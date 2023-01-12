import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service/public-api';
import { Employee } from 'src/app/shared/models/employee.interface';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employee: Employee;


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
    const empId = this.loginForm.controls['empId'].value;

    this.employeeService.findEmployeeById(empId).subscribe({
      next: (res) => {
        if(res) {
          this.employee = res;
          this.cookieService.set('session_user', this.employee.empId.toString(), 1);
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate(['/']);
        } else {
          
        }
      }
    })
  }

}
