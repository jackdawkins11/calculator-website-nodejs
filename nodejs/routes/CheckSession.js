var express = require('express');

var router = express.Router();

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