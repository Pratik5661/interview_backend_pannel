const jwt = require('jsonwebtoken');
const config = require('../config.json');

const verifyToken =  (req,res,next)=>{
    try{
        const verifyRes = jwt.verify(req.headers['x-access-token'], config.tokenSecret);
        next();
    } catch(err){
        res.status(403).json({status:'error', err:err.message})
    }
}

module.exports = verifyToken;