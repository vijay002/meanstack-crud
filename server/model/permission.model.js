var mongoose = require('mongoose');  
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

//Apply validation to Schema
var permissionSchema = new Schema({  
    module: { type :String, required : true },
    permission:  { type: String, required : true },
    modifiedDate : { type: Date }
});

module.exports = mongoose.model('permission',  permissionSchema);