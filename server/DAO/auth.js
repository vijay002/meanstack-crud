//var config = require('../../config/token');
var jwt = require('jsonwebtoken');

module.exports = {

    verifyToken: ( (req, res, next) => {
        let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
        //console.log('================= Verify Start ============');
        //console.log(token);
        //console.log(req.get('Authorization'));
        //console.log(req.headers['authorization']);
        //console.log('================= Verfity END ===========');
        
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'bearer') {
            token= req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            token = req.query.token;
        }
        if( token ) {
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
   
                if (err) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    // all good, continue
                    req.decoded = decoded; 
                    next();
                }
            });

        }  else {

            res.send({ success: false, message: 'No token exists.' });
            
        }
    })

}