var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
 
var RoleSchema = new mongoose.Schema({  
  roleName: String,
  loweredRoleName : String,
  description: String,
  isTechnician : Boolean,
  isEndUser : Boolean,
  isEditHelp : Boolean,
  _rolefeatures : [{type: Schema.Types.ObjectId, ref: 'rolefeatures' }]
});

mongoose.model('roles', RoleSchema);

module.exports = mongoose.model('roles');

