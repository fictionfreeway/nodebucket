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

module.exports = router;