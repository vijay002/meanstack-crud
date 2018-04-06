var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({  
  name: String,
  email: String,
  password: String,
  role : Object
});

mongoose.model('users', UserSchema);

module.exports = mongoose.model('users');