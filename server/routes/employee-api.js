const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

/* findEmployeeById */
router.get('/:empId', async(req, res) => {
    try {
        Employee.findOne({ 'empId': req.params.empId }, function(err, result) {
            // return 501 and error message in case of MongoDB error
            if(err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB error: ${err.message}`
                })
            } else {
                console.log(result);
                res.json(result); // returns user document as JSON
            }
        })
    } 
    
    // return 500 and error message in case of server error
    catch(e) {
        console.log(e);
        res.status(500).send({
            'err': 'Internal server error.'
        })
    }
})

module.exports = router;