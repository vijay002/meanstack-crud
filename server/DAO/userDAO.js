//var db = require('../../config/mongodb').init(),
//var db = require('./../../routes/api').connection();
//var   mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
//var config = require('../../config/token');
var auth = require('./auth')
var isInTest = typeof global.it === 'function';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;    

var UserModel = require('./../model/user.model');

// //Get the default connection
// var db = mongoose.connection;

// db = mongoose.createConnection(process.env.DB_URL, {
//     useMongoClient: true,
// });


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


// //User Schema
// var UserSchema = new Schema({
//     name: { type: String },
//     email :{ type: String },
//     password : { type : String }
// });

// UserSchema.pre('save', function(next){
//     now = new Date();
//     this.dateModified = now;
//     if ( !this.dateCreated ) {
//         this.dateCreated = now;
//     }
//     next();
// });



//Set up schema
//var UserModel = db.model('users', UserSchema);




//READ all users
function readUsers(skip, count, callbacks){
    // return UserModel.find({}, function (err, users) {
    //     if (err) return res.status(500).send("There was a problem finding the users.");
    //     res.status(200).send(users);
    // });

    return UserModel.find()
    .sort('-name').skip(skip).limit(count).exec('find', function (err, users) {
      // mongoose.connection.close();
        if (!err) {
            if(!isInTest) console.log("[GET]   Get all users: " + JSON.stringify(users));
            // response.data = users;
            // res.json(response);
            
            callbacks.success(users);
        } else {
            //sendError(err, res);
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}


//CREATE user function
function createUser(user, callbacks){
    var u = new UserModel({
        name:   user.name,
        password:   user.password,
        email: user.email,
        role : user.role
        //_id : user._id
    });

    u.save(function (err) {
       // mongoose.connection.close();
        if (!err) {
            if(!isInTest)
            { 
                console.log("[ADD]  User created with username: " + user.name);
                console.log(user);
            }
            callbacks.success(u);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}


//DELETE user
function deleteUser(id, callbacks){
    return UserModel.findById(id, function (err, user) {
        return user.remove(function (err) {
            if (!err) {
                if(!isInTest) console.log("[DEL]  Deleted user: " + id);
                callbacks.success(user);
            } else {
                if(!isInTest) console.log(err);
                callbacks.error(err);
            }
        });
    });
}

// //READ user by id
function readUserById(id, callbacks){
    return UserModel.findById(id, function (err, user) {
        if (!err) {
            if(!isInTest) console.log("[GET]   Get user: " + JSON.stringify(user));
            callbacks.success(user);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}


// //UPDATE user
function updateUser(id, user, callbacks){
    return UserModel.findById(id, function (err, u) {
        
        if (!err) {
            u.name = user.name;
            u.password = user.password;
            u.email = user.email;
            role = user.role;
            return u.save(function (err) {
                if (!err) {
                    if(!isInTest) console.log("[UDP] Updated user: " + JSON.stringify(u));
                    callbacks.success(u);
                } else {
                    if(!isInTest) console.log(err);
                    callbacks.error(err);
                }
            }).catch(e => next(e));
            
            
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }

    });
}



// //Login user
// function loginUser(user, callbacks){
//     return UserModel.find({'username': user.username }, function (err, u) {
//         if (!err) {
//             if(u[0]){
//                 if (u[0].password == user.password){
//                     //Login ok
//                     callbacks.success(u[0]);
//                 }else{
//                     //Password mismatch
//                     callbacks.error({msg: 'Invalid login parameters', data: user});
//                 }
//             }else{
//                 //User does not exist
//                 callbacks.error({msg: 'Invalid login parameters', data: user});
//             }
//         } else {
//             callbacks.error(err);
//         }
//     });
// }

function loginUser(user, callbacks){
    console.log('INSIDE USER');
    console.log(user);

    UserModel.findOne({'email' : user.email}, (err, usr) => {
  
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


      if( !(usr.password ==user.password) ){
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

      console.log('token' + token);

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


 module.exports.createUser = createUser;
 module.exports.readUsers = readUsers;
 module.exports.readUserById = readUserById;
 module.exports.updateUser = updateUser;
 module.exports.deleteUser = deleteUser;
 module.exports.loginUser = loginUser;

 //module.exports = mongoose.model('users', UserSchema);