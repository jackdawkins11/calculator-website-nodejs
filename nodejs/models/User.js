var mongoose = require('mongoose');

/*
  Defines the User table.
*/

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {type: String, required: true, maxlength: 100},
    password: {type: String, required: true, maxlength: 100},
  }
);

module.exports = mongoose.model( 'User', UserSchema );