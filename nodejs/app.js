var express = require('express');
var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoAuth = require('./mongoAuth');
mongoose.connect(mongoAuth.mongodb, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({extended:false}));

var createAccount = require('./routes/CreateAccount');
app.use('/CreateAccount', createAccount );

const PORT = 8000;
app.listen(PORT, function(err){ 
	if (err) console.log(err); 
	console.log("Server listening on PORT", PORT); 
}); 

