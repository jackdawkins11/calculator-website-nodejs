var express = require('express');

var router = express.Router();

router.post('/', function(req, res){
    req.session.destroy(function(error){
        if( error ){
            console.log( error );
        }
    });
    res.end();
} );

module.exports = router;