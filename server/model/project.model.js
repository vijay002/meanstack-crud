var mongoose = require('mongoose');  
var Schema = mongoose.Schema; // Assign Mongoose Schema function to variable

//Validation Here



//Apply validation to Schema
var ProjectSchema = new Schema({  
    title: { type :String, required : true },
    startingDate:  { type: Date, default: Date.now},
    endingDate : { type: Date },
    categoryId : { type : Number },
    statusId : { type : Number, required : true },
    users : [{
        type: Schema.Types.ObjectId,
        ref :'users'
    }]
});


// Middleware to ensure password is encrypted before saving user to database
ProjectSchema.pre('save', function(next) {
    var user = this;

    //before save validation
    return next();
});


//mongoose.model('ProjectRegistration', ProjectSchema);

module.exports = mongoose.model('projects', ProjectSchema);