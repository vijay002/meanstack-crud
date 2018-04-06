var isInTest = typeof global.it === 'function';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;    

var RoleModel = require('./../model/role.model');
var _ = require('underscore');

// Response handling
let response = {
    status: 200,
    rows: [],
    records: [],
    message: null
};

//READ all Projects
async function readRoles(skip, count, filters, callbacks){
    var gridfilter = "" ;
    
   var  gfilters = filters;
   console.log(gfilters);

    // if(_.isEmpty(gfilters))
    // {
    //    gridfilter +='{}';
    // }
    // else {
    //    var par = _.every(gfilters, function(value, ele){
    //        //console.log(ele);
    //        //console.log(value.value);
    //        gridfilter += '{ "' + ele +'": "/'+  value.value +'/i" }';
    //    })
    // }

    //gridfilter = JSON.parser(gridfilter);
    
   // gridfilter = JSON.parse(gridfilter);
    console.log(gridfilter);
    //generate query object based on availability of value 
    var query = {};
    if( _.isEmpty(gfilters) ) {
        //query["some_key"] = ;
    }
    else {
        //query["some_other_key"] = your_second_variable;
        _.every(gfilters, function(value, ele){
            //gridfilter += '{ "' + ele +'": "/'+  value.value +'/i" }';
            query[ele] = value.value;
        })
    }
    console.log(query);

    const [results, itemCount ] = await Promise.all([
        RoleModel.find(query).limit(count).skip(skip).lean().exec(),
        RoleModel.count(query)
      ]).catch(console.log.bind(console));
  

    //  return results;
      

     const pageCount = Math.ceil(itemCount / count);
    //  console.log('[totla count] ' + itemCount);
    //  console.log('[count] ' + count);
    //  console.log('[page count] ' + pageCount);
    
    return RoleModel.find(query)
    .sort('rolename').skip(skip).limit(count).lean().exec('find', function (err, roles) {
        if (!err) {
           // if(!isInTest) console.log("[GET]   Get all roles: " + JSON.stringify(roles));
            response.rows = roles;
            response.records = itemCount;
            // res.json(response);
            callbacks.success(response);
        } else {
            
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

function getAllRoles(callbacks)
{
    return RoleModel.find().sort('rolename').exec('find', function(err, roles) {
        if(!err){
           // if(!isInTest) console.log("[GET]  for Dropdown roles: " + JSON.stringify(roles));
            callbacks.success(roles);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//CREATE user function
function createRole(role, callbacks){
    var u = new RoleModel({
        roleName:   role.roleName,
        loweredRoleName:   role.loweredRoleName,
        description: role.description,
        isTechnician : role.isTechnician,
        isEndUser : role.isEndUser,
        isEditHelp : role.isEditHelp
    });

    u.save(function (err) {
        
        if (!err) {
            if(!isInTest)
            { 
                console.log("[ADD] ROLE NAME: " + role.roleName);
            }
            callbacks.success(u);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

// //READ user by id
function readRoleById(id, callbacks){
    return RoleModel.findById(id, function (err, role) {
        if (!err) {
            if(!isInTest) console.log("[GET] Get role : " + JSON.stringify(role));
            callbacks.success(role);
        } else {
            if(!isInTest) console.log(err);
            callbacks.error(err);
        }
    });
}

//DELETE user
function deleteRole(id, callbacks){
    return RoleModel.findById(id, function (err, data) {
        return data.remove(function (err) {
            if (!err) {
                if(!isInTest) console.log("[DEL]  Deleted Role: " + id);
                callbacks.success(data);
            } else {
                if(!isInTest) console.log(err);
                callbacks.error(err);
            }
        });
    });
}

// //UPDATE user
function updateRole(id, role, callbacks){
    return RoleModel.findById(id, function (err, r) {
        
        if (!err) {
            r.roleName =  role.roleName;
            r.loweredRoleName =   role.loweredRoleName;
            r.description = role.description;
            r.isTechnician = role.isTechnician;
            r.isEndUser = role.isEndUser;
            r.isEditHelp = role.isEditHelp;

            return r.save(function (err) {
                if (!err) {
                    if(!isInTest) console.log("[UDP] Updated Role: " + JSON.stringify(r));
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

module.exports.readRoles = readRoles;
module.exports.readRoleById = readRoleById;
module.exports.createRole = createRole;
module.exports.deleteRole = deleteRole;
module.exports.updateRole = updateRole;

module.exports.getAllRoles = getAllRoles;