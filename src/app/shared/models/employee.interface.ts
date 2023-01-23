/*
Title: employee.interface.ts
Author: William Watlington
Date: 14 January 2023
Description: employee interface matching mongodb schema for employee
*/

import { Item } from "./item.interface";

export interface Employee {
    empId: number;
    firstName: string;
    lastName: string;
    todo: Item[];
    done: Item[];
}
