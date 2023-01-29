/*
Title: item.interface.ts
Author: William Watlington
Date: 25 January 2023
Description: item interface for nodebucket matching mongoose model
*/

export interface Item {
  _id: string;
  text: string;
  dueDate: Date;
}
