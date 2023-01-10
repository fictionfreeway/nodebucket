/* 
Title: index.js
Author: William Watlington
Date: 10 January 2023
Description: main express server file for nodebucket
*/

/**
 * Require statements
 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// import swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// import employee API
const EmployeeAPI = require('./routes/employee-api');

const app = express(); // Express variable.

/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// default server port value.
const PORT = process.env.PORT || 3000;

// TODO: This line will be replaced with your database connection string (including username/password).
const CONN = 'mongodb+srv://nodebucket_user:n8BGspSTVkuw1nQV@cluster0.ug54bka.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection.
 */
mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
});


// configure and implement swagger UI for API testing
const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Employees API',
          version: '1.0.0',
      },
  },
  apis: ['./server/routes/employee-api.js']
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));


// APIs
app.use('/api', EmployeeAPI);


// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
