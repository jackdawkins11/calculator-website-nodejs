var express = require('express');
var User = require('../models/User');
var async = require('async');

var router = express.Router();

/*
    Checks the username and password for validity.
    Returns
        null if they are goood
    otherwise, returns json containing
            error: false
            createdAccount: false,
            message: why the username or password is invalid
*/

function checkUsernameAndPassword(username, password) {
    if (!username) {
        return {
            error: false,
            createdAccount: false,
            message: "Must specify a username",
        }
    }
    if (!password) {
        return {
            error: false,
            createdAccount: false,
            message: "Must specify a password",
        }
    }
    if (typeof (username) !== "string") {
        return {
            error: true,
            createdAccount: false,
            message: "Username must be string",
        }
    }
    if (typeof (password) !== "string") {
        return {
            error: true,
            createdAccount: false,
            message: "Password must be string",
        }
    }
    if (username.length < 4) {
        return {
            error: false,
            createdAccount: false,
            message: "Username must be at least 4 characters.",
        }
    }

    if (password.length < 10) {
        return {
            error: false,
            createdAccount: false,
            message: "Password must be at least 10 characters.",
        }
    }
    if (!(password.match(/[A-Z]/g)
        && password.match(/[a-z]/g)
        && password.match(/[0-9]/g)
        && password.match(/[!@#$%^&*()]/g))) {
        return {
            error: false,
            createdAccount: false,
            message: "Password must contain uppercase and lowercase letters, "
                + " a digit and at least one character from !@#$%^&*&()",
        }
    }
    return null;
}

/*
    Handles requests to /CreateAccount.
    Requires username and password as POST params.
    Returns json containing
        error (bool) whether there was an error
        createdAccount (bool) whether the specified account was created
        message (string) a message indicating why there was an error or an
            account was not created
*/

router.post('/', [
    function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var error = checkUsernameAndPassword(username, password);
        if (error) {
            res.json(error);
            return;
        }
        async.waterfall([
            function (callback) {
                User.countDocuments({ username: username }, function (err, count) {
                    callback(err, count);
                });
            },
            function (count, callback) {
                if (0 < count) {
                    callback(null, true);
                    return;
                }
                var user = new User({
                    username: username,
                    password: password
                });
                user.save(function (err) {
                    callback(err, false);
                });
            }
        ], function (err, userExists ) {
            var response = {
                error: true,
                createdAccount: false,
                message: ""
            }
            if(err){
                response.error = true;
            }else{
                response.error = false;
                if( userExists ){
                    response.message = "That username is already in use"
                }else{
                    response.createdAccount = true;
                }
            }
            res.json( response );
        });
    }
]);

module.exports = router;