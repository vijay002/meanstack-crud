
var isInTest = typeof global.it === 'function';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    
var ProjectModel = require('../model/project.model');
var _ = require('underscore');

// Response handling
let response = {
    status: 200,
    rows: [],
    records: [],
    message: null
};

//READ all Projects
async function readProjects(skip, count, filters, callbacks){
    var gridfilter = "" ;
    var  gfilters = filters;
    
    var query = {};
    if( _.isEmpty(gfilters) ) {
        //query["some_key"] = ;
    }
    else {
        _.every(gfilters, function(value, ele){
            query[ele] = value.value;
        })
    }

    const [results, itemCount ] = await Promise.all([
        ProjectModel.find(query).limit(count).skip(skip).lean().exec(),
        ProjectModel.count(query)
      ])
      .catch(console.log.bind(console));
  
     // const pageCount = Math.ceil(itemCount / count);

    return ProjectModel.find()
    .sort('-name').skip(skip).limit(count).exec('find', function (err, projects) {
        if (!err) {
            if(!isInTest) console.log("[GET] Get all projects: " + JSON.stringify(projects));
            response.rows = projects;
            response.records = itemCount;
            callbacks.success(response);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}


function getAllProject(callbacks)
{
    return ProjectModel.find().sort('title').exec('find', function(err, proj) {
        if(!err){
            callbacks.success(proj);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}


// //READ user by id
function readProjectById(id, callbacks){
    return ProjectModel.findById(id, function (err, project) {
        if (!err) {
            if(!isInTest) console.log("[GET] Get project : " + JSON.stringify(project));
            callbacks.success(project);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//CREATE user function
function createProject(proj, callbacks){
    console.log('Projects  value');
    console.log(proj);

    var project = new ProjectModel({
        title:   proj.title,
        startingDate:  proj.startingDate,
        endingDate : proj.endingDate,
        categoryId : proj.categoryId,
        statusId : proj.statusId,
        users : proj.users
       
    });

    project.save(function (err) {
        if (!err) {
            if(!isInTest)
            { 
                console.log("[ADD] " + proj.title);
            }
            callbacks.success(project);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//DELETE user
function deleteProject(id, callbacks){
    return ProjectModel.findById(id, function (err, data) {
        return data.remove(function (err) {
            if (!err) {
                if(!isInTest) console.log("[DEL]  Deleted project: " + id);
                callbacks.success(data);
            } else {
                if(!isInTest) console.log(err);
                callbacks.error(err);
            }
        });
    });
}

// //UPDATE user
function updateProject(id, proj, callbacks){
    return ProjectModel.findById(id, function (err, p) {
        
        if (!err) {
            p.title =   proj.title;
            p.startingDate =  proj.startingDate;
            p.endingDate = proj.endingDate;
            p.categoryId = proj.categoryId;
            p.statusId = proj.statusId;
            p.users = proj.users;

            return p.save(function (err) {
                if (!err) {
                    if(!isInTest) console.log("[UDP] Updated project: " + JSON.stringify(p));
                    callbacks.success(r);
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

module.exports.readProjects = readProjects;
module.exports.getAllProject = getAllProject;
module.exports.readProjectById = readProjectById;
module.exports.createProject = createProject;
module.exports.updateProject = updateProject;
module.exports.deleteProject = deleteProject;