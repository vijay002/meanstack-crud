
var express = require('express');
var app = express();
var router = express.Router();
//var User = require('../../models/user');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var auth = require('./auth');
//var UserModel = require('./../../routes/api/userAPI').UsersModel;

var isInTest = typeof global.it === 'function';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    
// db = mongoose.createConnection(process.env.DB_URL, {
//     useMongoClient: true,
// });

var UserModel = require('./../model/user.model');


//var Schema = mongoose.Schema;   

//var UserModel = mongoose.model('users');


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



//User Schema
var UserSchema = new Schema({
  name: { type: String },
  email :{ type: String },
  password : { type : String }
});


// //Set up schema
// var UserModel = db.model('users', UserSchema);


// router.get('/check-state', auth.verifyToken, (req, res) => {

//   let content = {
//     success: true,
//     message: 'Successfully logged in'
//   }
//   res.send(content);

// });


function loginAccount(user, callbacks){
  console.log('INSIDE ACCOUNT');
 // console.log(user);
  //UserModel.find({ email : user.email })
  UserModel.findOne({'email' : user.email}, (err, usr) => {
    //mongoose.connection.close();
    console.log('1');
    if( err )
      return done(err);

    if( !usr ) {
      let content = {
        success: false,
        message: 'User does not exists'
      };
      //res.send(content);
      callbacks.error({msg: 'User does not exist', data: false});
      return;
    }


    if( !(usr.password == user.password) ){
      let content = {
        success: false,
        message: 'Incorrect password'
      };
      //res.send(content);
      callbacks.error({msg: 'Incorrect Password', data: false});
      return;
    }



  //   if( !usr.validPassword(user.password) ){
  //     let content = {
  //       success: false,
  //       message: 'Incorrect password'
  //     };
  //     res.send(content);
  //     return;
  //   }

    let token = jwt.sign(usr.toJSON(), process.env.SECRET, {
      expiresIn : 60*60*24
    });

    //console.log('token: ' + token);

    let content = {
      user: usr,
      success: true,
      message: 'You logged in',
      token: token
    };
    //res.send(content);
    callbacks.success(content);
  }) 
}




router.post('/register11', (req, res) => {

  var reqUser = req.body;

  process.nextTick( () => {
    User.findOne({ 'email': reqUser.email }, (err, user) => {
      if(err)
        return done(err);
      
      if(user){
        let content = {
          success: false,
          message: 'user already exists'
        };
        res.send(content);
        return;
      } else {
        var newUser = new User();
        newUser.email = reqUser.email;
        newUser.password = newUser.generateHash(reqUser.password);
        newUser.save( (err) => {
            if( err )
                throw err;

            let token = jwt.sign(newUser, config.secret, {
              expiresIn : 60*60*24
            });
            let content = {
              user: newUser,
              success: true,
              message: 'You created a new user',
              token: token
            };
            res.send(content);
            return;
        })
      }
    })
  })
});

router.post('/login11', (req, res) => {

  var reqUser = req.body;

  User.findOne({'email' : reqUser.email}, (err, user) => {

    if( err )
      return done(err);

    if( !user ) {
      let content = {
        success: false,
        message: 'User does not exists'
      };
      res.send(content);
      return;
    }

    if( !user.validPassword(reqUser.password) ){
      let content = {
        success: false,
        message: 'Incorrect password'
      };
      res.send(content);
      return;
    }

    let token = jwt.sign(user, config.secret, {
      expiresIn : 60*60*24
    });
    let content = {
      user: user,
      success: true,
      message: 'You logged in',
      token: token
    };
    res.send(content);

  })

});



module.exports.loginAccount = loginAccount;
//module.exports = router;
