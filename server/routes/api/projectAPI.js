var express = require('express'),
    router = express.Router(),
    domain = require('domain');
var  projectDAO = require('./../../DAO/projectDAO');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    
var auth = require('./../../DAO/auth');
var jwt = require('jsonwebtoken');
var superSecret = process.env.SECRET;


router.get('/projects', auth.verifyToken,  (req, res) =>{
   
    var skip = parseInt(req.query.first === '' ? 0 : req.query.first);
    var count = parseInt(req.query.rows === '' ? 10 : req.query.rows);
    var gridfilter = req.query.filters;
    console.log('Projects Request header value');

    // projectDAO.readProjects(skip, count, {
    //     success: function(data){
    //         res.status(200).send(JSON.stringify(data));
    //     },
    //     error: function(err){
    //         res.status(500).send(err);
    //     }
    // }); 

    projectDAO.readProjects(skip, count, gridfilter, {
        success: function(data){
            res.status(200).send(JSON.stringify(data));
        },
        error: function(err){
            res.status(500).send(err);
        }
    });


})


router.get('/projects/getall', auth.verifyToken, (req, res) => {
    projectDAO.getAllProject({
        success: function(data){
            res.status(200).send(JSON.stringify(data));
        },
        error: function(err){
            res.status(500).send(err);
        }
    });
    
});


//READ Role by id
router.get('/projects/:id', auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});

    });

    d.run(function(){
        projectDAO.readProjectById(req.params.id ,{
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
router.post('/projects', auth.verifyToken, function (req, res) {
    var d = domain.create();
    
    d.on('error', function(error){
        if(!isInTest)  console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });
    

    d.run(function(){
        projectDAO.createProject({
                title:  req.body.title,
                startingDate:  req.body.startingDate,
                endingDate : req.body.endingDate,
                categoryId : req.body.categoryId,
                statusId : req.body.statusId,
                user : req.body.user
            }, 
            {
            success: function(pro){
                res.status(201).send({msg: 'Project created succesfully: '+JSON.stringify(pro), data: pro});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//UPDATE 
router.put('/projects/:id', auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        projectDAO.updateProject(req.params.id, {
            title:  req.body.title,
            startingDate:  req.body.startingDate,
            endingDate : req.body.endingDate,
            categoryId : req.body.categoryId,
            statusId : req.body.statusId,
            user : req.body.user
            }, 
            {
            success: function(user){
                res.status(200).send({msg:'Project updated succesfully: '+JSON.stringify(user), data:user});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

//DELETE 
router.delete('/projects/:id', auth.verifyToken, function (req, res){
    var d = domain.create();

    d.on('error', function(error){
        if(!isInTest) console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        projectDAO.deleteProject(req.params.id ,{
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
