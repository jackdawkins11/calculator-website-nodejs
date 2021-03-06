var express = require('express');

var router = express.Router();

/*
    Handles requests to /EndSession
    Ends a session if a session exists and returns nothing
*/

router.post('/', function(req, res){
    req.session.destroy(function(error){
        if( error ){
            console.log( error );
        }
    });
    res.end();
} );

module.exports = router;