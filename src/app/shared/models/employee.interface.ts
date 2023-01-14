/* 
Title: employee.interface.ts
Author: William Watlington
Date: 14 January 2023
Description: employee interface matching mongodb schema for employee
*/

export interface Employee {
    empId: number;
    firstName: string;
    lastName: string;
}