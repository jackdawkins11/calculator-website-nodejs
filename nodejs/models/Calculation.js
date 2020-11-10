var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CalculationSchema = new Schema(
  {
    X: {type: String, required: true, maxlength: 11},
    Op: {type: String, reequired: true, maxLength: 1},
    Y: {type: String, required: true, maxlength: 11},
    Val: {type: String, required: true, maxlength: 11},
    Date: {type: Date},
    User: [{type: Schema.Types.ObjectId, ref: 'User', reequired: true}]
  }
);

module.exports = mongoose.model( 'Calculation', CalculationSchema );