var express = require('express');
var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoAuth = require('./mongoAuth');
mongoose.connect(mongoAuth.mongodb, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var session = require('express-session');
app.use(session({ 

	// It holds the secret key for session 
	secret: 'Your_Secret_Key', 

	// Forces the session to be saved 
	// back to the session store 
	resave: true, 

	// Forces a session that is "uninitialized" 
	// to be saved to the store 
	saveUninitialized: true
}));

app.use(express.urlencoded({extended:false}));

var createAccount = require('./routes/CreateAccount');
var startSession = require('./routes/StartSession');
var checkSession = require('./routes/CheckSession');
var endSession = require('./routes/EndSession');
var addCalculation = require('./routes/AddCalculation');
var getLast10Calculations = require('./routes/GetLast10Calculations');

app.use('/CreateAccount', createAccount );
app.use('/StartSession', startSession );
app.use('/CheckSession', checkSession );
app.use('/EndSession', endSession );
app.use( '/AddCalculation', addCalculation );
app.use( '/GetLast10Calculations', getLast10Calculations );

const PORT = 8000;
app.listen(PORT, function(err){ 
	if (err) console.log(err); 
	console.log("Server listening on PORT", PORT); 
});