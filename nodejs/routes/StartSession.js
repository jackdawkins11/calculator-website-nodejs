var express = require('express');
var User = require('../models/User');
var async = require('async');

var router = express.Router();

/*
    Handles requests to /StartSession
    Returns {
        error (bool)
        hasSession (bool)
    }
*/

router.post('/', function(req, res){
    var response = {
        error: false,
        hasSession: false
    };
    var username = req.body.username;
    var password = req.body.password;
    if( !username || !password ){
        response.hasSession = false;
        res.json(response);
        return;
    }
    async.parallel({
        user_count: function(callback){
            User.countDocuments( {username: username, password: password}, callback );
        }
    }, function(error, results){
        if( error ){
            response.error = true;
        }else{
            if( results.user_count == 1 ){
                req.session.username = username;
                response.hasSession = true;
            }
        }
        res.json(response);
    });
});

module.exports = router;