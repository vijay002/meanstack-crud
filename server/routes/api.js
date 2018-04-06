const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();

var _ = require('underscore'); 

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useMongoClient : true, });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//mongoose.connect(process.env.DB_URL);
//var db = mongoose.createConnection(process.env.DB_URL, { useMongoClient: true  });

//Get the default connection
var db = mongoose.connection;




db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connect to mongoose connections');
});




// // Connect
// const connection = (closure) => {
//     return MongoClient.connect(process.env.DB_URL, (err, db) => {
//         if (err) return console.log(err);
//         closure(db);
//     });
// };




// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
// router.get('/users', (req, res) => {
//     connection((db) => {
//         db.collection('users')
//             .find()
//             .toArray()
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

module.exports = router;
//module.exports.connection = connection;