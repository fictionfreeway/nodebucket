/* 
Title: employee.js
Author: William Watlington
Date: 10 January 2023
Description: Employee model for nodebucket application
*/

// imports 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create employeeSchema for use with mongoose/mongoDB
let employeeSchema = new Schema({
    empId: { type: Number, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String }
}, { 
    collection: 'employees' // specifies collection inside of nodebucket database
})

// export employee mongoose model 
module.exports = mongoose.model('Employee', employeeSchema);