var express = require('express'),
    router = express.Router(),
    domain = require('domain'),
    userDAO = require('./../../DAO/userDAO');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    
var auth = require('./../../DAO/auth');

var jwt = require('jsonwebtoken');
var superSecret = process.env.SECRET;

//mongoose.connect(process.env.DB_URL);

// db = mongoose.createConnection(process.env.DB_URL, {
//     useMongoClient: true,
//   });

//   var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// console.log('Connect to mongoose connections User API js');
// });
    



//   var animalSchema = new Schema({ name: String, type: String });
//   var Animal = mongoose.model('Animal', animalSchema);
//   var dog = new Animal({ type: 'dog' });
//   dog.findSimilarTypes(function(err, dogs) {
//     console.log(dogs); // woof
//   });

//   var userSchema = new Schema({ name: String, email: String, password: String });
//   var userModel = mongoose.model('users', userSchema);
//   var vObjec = new userModel({ name:'vijay' });
//   vObjec.findOne(function (err, users){
//       console.log(users);
//   });



//var UserSchema = new mongoose.Schema({ name: 'string', email: 'string', password:'string' });
//var UsersModel = mongoose.model('users', UserSchema);

router.get('/check-state', auth.verifyToken, (req, res) => {
    let content = {
      success: true,
      message: 'Successfully logged in'
    }
    res.send(content);
});

router.get('/users', auth.verifyToken, (req, res) => {
        var skip = 0; // req.query.skip
        var count = 20; // req.query.count
        
        userDAO.readUsers(skip, count, {
                        success: function(Users){
                            res.status(200).send(JSON.stringify(Users));
                        },
                        error: function(err){
                            res.status(500).send(err);
                        }
                    });


        //  var uObj = db.model('users', schema);
        // // console.log(' Count User model ' +uObj.count());
        // // console.log(' model ' +UsersModel.count());

        // uObj.find().exec(function (err, results) {
        //     var count = results.length;
        //     console.log(' model ' +count)
        //   });


        // var query = uObj.findOne({ 'name.last': 'Ghost' });
        // console.log(query);


        
            // db.collection('users')
            //     .find()
            //     .then((users) => {
            //         console.log('User ' + users);
                    
            //     })
            //     .catch((err) => {
            //         console.log('Error test User ' + err);
            //     });
        
    });


// var users =[];
// /// Add employee
// router.post("/users", function (req,res) {
//     var user = req.body;
//     var isValid =true;
//     if(isValid){
//         users.push(employee);
//         //res.send(user);
//         res.send(201, req.body);
//     }
//      else {
//         res.sendStatus(500);
//     }
// });


router.post('/users', auth.verifyToken,function (req, res) {
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest)  console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });
    d.run(function(){
        userDAO.createUser({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                role : req.body.role
            }, {
            success: function(user){
                res.status(201).send({msg: 'User created succesfully: '+JSON.stringify(user), data: user});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });


    // userDAO.createUser(req, {
    //     success: function(Users){
    //         res.status(200).send(JSON.stringify(Users));
    //     },
    //     error: function(err){
    //         res.status(500).send(err);
    //     }
    // });
});


 //UPDATE User
 router.put('/users/:id',auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        userDAO.updateUser(req.params.id, {
                name:      req.body.name,
                password:   req.body.password,
                email:    req.body.email,
                role : req.body.role
            }, 
            {
            success: function(user){
                res.status(200).send({msg:'User updated succesfully: '+JSON.stringify(user), data:user});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

// router.put('/users/:name', function(req,res) {
//     console.log('user api');
//     res.send(200, req.body);
//  });

//READ User by id
router.get('/users/:id', auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});

    });

    d.run(function(){
        userDAO.readUserById(req.params.id ,{
            success: function(User){
                res.status(200).send(JSON.stringify(User));
            },
            error: function(err){
                res.status(404).send(err);
            }
        });
    });
});


// router.delete('/users/:name', function(req, res) {
//     res.sendStatus(204);
// });

//DELETE User
router.delete('/users/:id',auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        userDAO.deleteUser(req.params.id ,{
            success: function(u){
                res.status(200).send({msg: 'User deleted succesfully: ' + req.params.id,
            data: u});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//Create User Check new login
router.post('/user/login', auth.verifyToken, (req, res) => {
    var reqUser = req.body;
    var d = domain.create();
    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });
    d.run(function(){
        userDAO.loginUser({
            email:    req.body.email,
            password:   req.body.password
        },{
            success: function(u){
                res.status(200).send({msg: 'User Login succesfully: ' + req.params._id, data: u});

                //vijay
               // if user is found and password is right
                // create a token
                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, superSecret, {
                expiresIn: '24h' // expires in 24 hours
                });

                //return the information including token as JSON
                res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
                });


            },
            error: function(err){
                res.status(500).send(err);
                //res.send(err);
            }
        });
    });






  
    // User.findOne({'email' : reqUser.email}, (err, user) => {
  
    //   if( err )
    //     return done(err);
  
    //   if( !user ) {
    //     let content = {
    //       success: false,
    //       message: 'User does not exists'
    //     };
    //     res.send(content);
    //     return;
    //   }
  
    //   if( !user.validPassword(reqUser.password) ){
    //     let content = {
    //       success: false,
    //       message: 'Incorrect password'
    //     };
    //     res.send(content);
    //     return;
    //   }
  
    //   let token = jwt.sign(user, config.secret, {
    //     expiresIn : 60*60*24
    //   });
    //   let content = {
    //     user: user,
    //     success: true,
    //     message: 'You logged in',
    //     token: token
    //   };
    //   res.send(content);
  
    // })
  
  });



// //CREATE a new user
// router.post('/user', function (req, res){
//     var d = domain.create();
//     console.log('post user');

//     d.on('error', function(error){
//         if(!isInTest)  console.log(error.stacktrace);
//         res.status(500).send({'error': error.message});
//     });

//     d.run(function(){
//         userDAO.createUser({
//                 username:   req.body.username,
//                 password:   req.body.password,
//                 email:      req.body.email
//             }, {
//             success: function(user){
//                 //res.status(201).send({msg: 'User created succesfully: '+JSON.stringify(user), data: user});
//                 res.status(200);
//             },
//             error: function(err){
//                 res.status(500).send(err);
//             }
//         });
//     });
// });


// //READ all Users
// router.get('/', function(req, res, next) {
//     var d = domain.create();
//     var skip = req.query.skip;
//     var count = req.query.count;

//     d.on('error', function(error){
//         if(!isInTest) console.log(error.stacktrace);
//         res.status(500).send({'error': error.message});
//     });

//     d.run(function(){
//         userDAO.readUsers(skip, count, {
//             success: function(Users){
//                 res.status(200).send(JSON.stringify(Users));
//             },
//             error: function(err){
//                 res.status(500).send(err);
//             }
//         });
//     });
// });

router.get('/users/getalluser', auth.verifyToken, function(req,res) {
    console.log('user');
    res.send(200, req.body);
 });

//module.exports = mongoose.model('users', UserSchema);  
module.exports = router;