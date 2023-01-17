/*
Title: employee-api.js
Author: William Watlington
Date: 10 January 2023
Description: routes for employee API in nodebucket application
*/


// imports
const express = require('express');
const Employee = require('../models/employee');
const router = express.Router();
const config = require('../data/config.json');


/**
 * findEmployeeById
 * @openapi
 * /api/employees/{empId}:
 *  get:
 *    tags:
 *      - Employees
 *    description: API for returning employee by empId
 *    summary: returns employee document matching empId in params
 *    parameters:
 *      - in: path
 *        name: empId
 *        schema:
 *          type: number
 *          description: empId to search for
 *    responses:
 *      '200':
 *        description: Employee document
 *      '500':
 *        description: Server Exception
 *      '501':
 *        description: MongoDB Exception
 *
 */
router.get('/:empId', async(req, res) => {
    try {
        // attempts to find one employee document with matching empId, returns that document or returns error
        Employee.findOne({ 'empId': req.params.empId }, function(err, result) {
            // return 501 and error message in case of MongoDB error
            if(err) {
                console.log(err);
                res.status(501).send({
                    'err':  config.mongoServerError + '+ ' + err.message
                })
            }
            // returns user document as JSON if no error encountered
            else {
                console.log(result);
                res.json(result);
            }
        })
    }

    // return 500 and error message in case of server error
    catch(e) {
        console.log(e);
        res.status(500).send({
            'err': config.serverError
        })
    }
})


//find all tasks api
router.get('/:empId/tasks', async(req,res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, emp) {
      if(err) {
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ': ' + err.message
        })
      } else {
        console.log(emp);
        res.json(emp);
      }
    })
  } catch(e) {
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ': ' + e.message
    })
  }
})

//create task api
router.post('/:empId/tasks', async(req, res) => {
  try {
    Employee.findOne({'empId': req.params.empId}, function(err, emp) {
      if(err) {
        console.log(err);
        res.status(501).send({
          'err': config.mongoServerError + ': ' + err.message
        })
      } else {
        console.log(emp);

        if(emp) {
          const newTask = {
            text: req.body.text
          }

          emp.todo.push(newTask);

          emp.save(function(err, updatedEmp) {
            if(err) {
              console.log(err);
              res.status(501).send({
                'err': config.mongoServerError + ': ' + err.message
              })
            } else {
              console.log(updatedEmp);
              res.json(updatedEmp);
            }
          })
        } else {
          res.status(401).send({
            'message': 'EmployeeId: ' + req.params.empId + ' does not exist'
          })
        }

      }
    })
  } catch {
    console.log(e);
    res.status(500).send({
      'err': config.serverError + ': ' + e.message
    })

  }
})

module.exports = router;
