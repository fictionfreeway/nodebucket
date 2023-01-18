/* 
Title: item.js
Author: William Watlington
Date: 18 January 2023
Description: task item model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let itemSchema = new Schema({
  text: { type: String }
})

module.exports = itemSchema;
