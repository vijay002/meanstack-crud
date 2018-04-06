var express = require('express'),
    router = express.Router(),
    domain = require('domain');
    roleDAO = require('./../../DAO/roleDAO');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    
var auth = require('./../../DAO/auth');
var _ = require('underscore');

//Read ALL
router.get('/roles',auth.verifyToken, (req, res) => {
    var skip = parseInt(req.query.first === '' ? 0 : req.query.first);
    var count = parseInt(req.query.rows === '' ? 10 : req.query.rows);
    var gridfilter = req.query.filters;
    //var gridfilter = JSON.parse(req.query.filters);

    // var gridfilter = "" ;
    //var count = 1;
    console.log('Request header value');
    // console.log(skip);
    // console.log(count);
   //console.log(filters);
    //console.log(filters.roleName);
    // //console.log(_.find(filters, ['value'] ));
    //  var key = _.findKey(filters, function(value, key) {
    //      return key[0].value;
    //  });
    //  console.log(key); 

    //  console.log('----------'); 
    //  if(_.isEmpty(filters))
    //  {
    //     gridfilter +='{}';
    //  }
    //  else {
    //     var par = _.every(filters, function(value, ele){
    //         //console.log(ele);
    //         //console.log(value.value);
    //         gridfilter += '{ "' + ele +'": "/^'+  value.value +'/i" }';
    //     })
    // }

    //  var  key2 =  _.findWhere(filters, function (filter) { return filter[0]  });
    //  console.log(key2);
    //  //var obk =  _.contains(filters, 'admin');;
    //  //console.log('value : ' + obk);


    roleDAO.readRoles(skip, count, gridfilter, {
        success: function(data){
            res.status(200).send(JSON.stringify(data));
        },
        error: function(err){
            res.status(500).send(err);
        }
    });
    
});

router.get('/roles/getall', auth.verifyToken, (req, res) => {
    roleDAO.getAllRoles({
        success: function(data){
            res.status(200).send(JSON.stringify(data));
        },
        error: function(err){
            res.status(500).send(err);
        }
    });
    
});

//READ Role by id
router.get('/roles/:id', auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});

    });

    d.run(function(){
        roleDAO.readRoleById(req.params.id ,{
            success: function(result){
                res.status(200).send(JSON.stringify(result));
            },
            error: function(err){
                res.status(404).send(err);
            }
        });
    });
});

//Create
router.post('/roles', auth.verifyToken, function (req, res) {
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest)  console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });
    d.run(function(){
        roleDAO.createRole({
                roleName:   req.body.roleName,
                loweredRoleName:  req.body.roleName.toLowerCase(),
                description:  req.body.description,
                isTechnician : req.body.isTechnician,
                isEndUser : req.body.isEndUser,
                isEditHelp : req.body.isEditHelp
            }, {
            success: function(role){
                res.status(201).send({msg: 'Role created succesfully: '+JSON.stringify(role), data: role});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});



//UPDATE 
router.put('/roles/:id', auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        roleDAO.updateRole(req.params.id, {
            roleName:   req.body.roleName,
            loweredRoleName:  req.body.roleName.toLowerCase(),
            description:  req.body.description,
            isTechnician : req.body.isTechnician,
            isEndUser : req.body.isEndUser,
            isEditHelp : req.body.isEditHelp
            }, 
            {
            success: function(user){
                res.status(200).send({msg:'Role updated succesfully: '+JSON.stringify(user), data:user});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});


//DELETE 
router.delete('/roles/:id', auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        roleDAO.deleteRole(req.params.id ,{
            success: function(u){
                res.status(200).send({msg: 'Role deleted succesfully: ' + req.params.id,
            data: u});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

module.exports = router;

