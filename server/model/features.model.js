var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var featuresSchema = new Schema({
    featurename : { type: String, default : '', required: true },
    feature   : [{type: Schema.Types.ObjectId, ref: 'features' }]
});