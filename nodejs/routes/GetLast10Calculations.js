var express = require('express');
var Calculation = require('../models/Calculation');
const User = require('../models/User');

var router = express.Router();

/*
    Handles requests to /GetLast10Calculations
    Returns json containing
        error (bool) whether there was an error
        calculations: [{X, Op, Y, Val, Date, Username}]
*/

router.post('/', function(req, res){
    Calculation.find({}).sort('-Date').limit(10).populate('User').exec(function( err, calculations){
        if( err ){
            res.json( { error: true, error_details: err } );
            return;
        }
        var response = [];
        for( var i = 0; i < calculations.length; i++){
            const elem = calculations[ i ];
            var isoDateTime = new Date(elem.Date.getTime() - (elem.Date.getTimezoneOffset() * 60000)).toISOString();
            response.push({
                X: elem.X,
                Op: elem.Op,
                Y: elem.Y,
                Val: elem.Val,
                Date: isoDateTime.slice(0, 19).replace('T', ' '),
                Username: elem.User.username,
            });
        }
        res.json( { "error": false, calculations: response } );
    });
});

module.exports = router;