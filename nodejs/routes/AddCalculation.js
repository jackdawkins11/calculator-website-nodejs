var express = require('express');
const { body,validationResult } = require('express-validator');
var Calculation = require('../models/Calculation');
var async = require('async');
const User = require('../models/User');

var router = express.Router();

/*
    Handles the request to AddCalculation. Expects x, op, y, val, date as POST params.
    Also expects the user to have a session.
    Returns json containing:
        error (bool) true if there are bad input parameters, the user does not
            have a session, or there was an error inserting into the database
*/

router.post('/', [
    body('x', 'x must be 0-10 digit number.').trim().isLength({ min: 1, max: 10 })
        .isNumeric(),
    body('op', 'op must be an operation.').trim().isLength({min:1, max:1})
        .isIn(['+', '-', '*', '/']),
    body('y', 'y must be 0-10 digit number.').trim().isLength({ min: 1, max: 10 })
        .isNumeric(),
    body('val', 'val must be 0-10 digit number.').trim().isLength({ min: 1, max: 10 })
        .isNumeric(),
    //TODO validate date
    function( req, res ){
        const errors = validationResult(req);
        if( !errors.isEmpty() ){
            res.json({ error: true, error_details: errors.errors} );
            return;
        }
        if( !req.session.username ){
            res.json({ error: true, error_details: "Client must have session" });
            return;
        }
        async.waterfall([
            function(callback){
                User.find( {username: req.session.username} ).exec(callback);
            },
            function(user, callback){
                var calculation = new Calculation({
                    X: req.body.x,
                    Op: req.body.op,
                    Y: req.body.y,
                    Val: req.body.val,
                    Date: new Date( req.body.date ),
                    User: user[0]._id,
                });
                calculation.save( function(err){
                    if( err ){
                        res.json({ error: true, error_details: err});
                        return;
                    }
                    res.json({error: false});
                });
            }
        ]);
    }
]);

module.exports = router;