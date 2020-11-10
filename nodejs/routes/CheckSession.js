var express = require('express');

var router = express.Router();

/*
    Handles the request to CheckSession.
    Returns json containing
        hasSession (bool) whether the client has a session
*/

router.post('/', function(req, res){
    var response = {
        hasSession: false
    };
    if( req.session.username ){
        response.hasSession = true;
    }
    res.json( response );
} );

module.exports = router;