var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RolefeaturesSchema = new Schema({
    fullcontrol : { type: Boolean, default : false, required: true },
    canview : { type: Boolean, default : false, required: true },
    canedit : { type: Boolean, default : false, required: true },
    canadd : { type : Boolean, default : false, required : true },
    candelete : {type : Boolean, default : false, required : true },
    subscribing   : [{type: Schema.Types.ObjectId, ref: 'roles' }],
    subscribing   : [{type: Schema.Types.ObjectId, ref: 'features' }]
});

mongoose.model('rolefeatures', RoleSchema);

module.exports = mongoose.model('rolefeatures');

