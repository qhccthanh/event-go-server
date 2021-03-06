var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var LocationInfo = require('./../Events/LocationInfo.js');

var userSubSchema = new Schema({
  supplier_id: {
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  created_date: {
    type: Date,
    default: new Date()
  }
});

var userSubSchema = mongoose.model('user-subsrcibe',userSubSchema);
module.exports =  userSubSchema;
