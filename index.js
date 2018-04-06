var express = require('express'),  http = require('http');
const path = require('path');
var app = express();
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


// super secret for creating tokens
var superSecret = process.env.SECRET;


// API file for interacting with MongoDB
const api = require('./server/routes/api');
const accountAPI = require('./server/routes/api/accountAPI');
const userAPI = require('./server/routes/api/userAPI');
const roleAPI = require('./server/routes/api/roleAPI');
const projectAPI = require('./server/routes/api/projectAPI');

// Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Angular 2, 4,5   DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//API Start


app.use('/api', api);
app.use('/api', accountAPI);

// // Add headers secure API
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);


//      // check header or url parameters or post parameters for token
//       var token = req.body.token || req.query.token || req.headers['authorization'];
//       //console.log('Token1 ' + token);
//       //authorization
//       console.log('------------- Token ---------------');
//       console.log(req.headers['authorization']);
//       console.log('-----------------------------------');
//       //console.log(req.headers);


//       // decode token
//   if (token) {
//     // verifies secret and checks exp
//     jwt.verify(token, superSecret, function(err, decoded) {      
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });

//   } 
//   else 
//   {

//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });

//   }

//     // Pass to next layer of middleware
//     next();
// });



// Add API location 
app.use('/api', userAPI);
app.use('/api', roleAPI);
app.use('/api', projectAPI);
//var router = express.Router();
//app.use('/api', router);


var port = process.env.port  || 3000;
//app.set('superSecret', process.env.SECRET);
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Application Running on localhost:${port}`));



// app.get('/getHello', function (req, res) {
//      res.send('Hello World');
// })

// server.get('/gethello', function(req, res){
// res.send('Hello Word');
// });



//Working
// var router = express.Router();
//  app.use('/api', router);
//  app.listen(port, () =>  {
//    console.log('Listeing on port :===== ' + port)
//   });



// app.listen(3000, () => {
// console.log('Listeing on port 3000');
// });


// app.get('/GetHello', function (req, res) {
//   res.send('Hello World');
  
// })








// router.get("/",function (req,res){
//   res.send('Default');
// });


// router.get("/get",function (req,res){
//   res.send('Hello test');
// });



// router.get("/getall",function (req,res){
//   res.send('Get All method');
// });