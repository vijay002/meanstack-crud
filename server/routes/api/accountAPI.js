var express = require('express'),
    router = express.Router(),
    domain = require('domain');// ,
    userDAO = require('./../../DAO/userDAO'),
    accountDAO = require('./../../DAO/accountDAO');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    
var auth = require('./../../DAO/auth');

var jwt = require('jsonwebtoken');
var superSecret = process.env.SECRET;

var isInTest = typeof global.it === 'function';

//var User = require('./userAPI').UsersModel;

//var UserModel = mongoose.model('users', Users);

var db = mongoose.createConnection(process.env.DB_URL, {
    useMongoClient: true,
});

//var UserModel = mongoose.model('users');

// get an instance of the router for api routes

// route to authenticate a user (POST http://localhost:8080/api/authenticate)



router.post('/account/authenticate', function(req, res) {

  console.log(req.body);
  //let user =  User.find({ name : req.body.name });
    // find the user

    var reqUser = req.body;
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
      accountDAO.loginAccount({
          email:    req.body.email,
          password:   req.body.password
      },{
          success: function(u){
              res.status(200).send({msg: 'User Login succesfully: ' + req.params._id, data: u});

              //console.log(u.user);


          },
          error: function(err){
              res.status(500).send(err);
              //res.send(err);
          }
      });
  });



    // let user1 =  UserModel.findOne({ email : req.body.email });
    // console.log(user1.name);

    // UserModel.findOne({
    //   email: req.body.email
    // }, function(err, user) {
    //     //mongoose.connection.close();
    //   if (err) throw err;
  
    //   if (!user) {
    //     res.json({ success: false, message: 'Authentication failed. User not found.' });
    //   }
    //   else if (user) 
    //   {
  
    //     // check if password matches
    //     if (user.password != req.body.password) {
    //       res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    //     } else {
  
    //       // if user is found and password is right
    //       // create a token with only our given payload
    //   // we don't want to pass in the entire user since that has the password
    //   const payload = {
    //     admin: user.admin 
    //   };
    //       var token = jwt.sign(payload, superSecret, {
    //         expiresInMinutes: 1440 // expires in 24 hours
    //       });
  
    //       // return the information including token as JSON
    //       res.json({
    //         success: true,
    //         message: 'Enjoy your token!',
    //         token: token
    //       });
    //     }   
  
    //   }
  
    // });

  });

module.exports = router;