
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next)=>{
    const token  = req.body.token || req.query.token || req.header['x-access-token'];
    if (!token){
        return res.status(403).json({sucess: false, message: "Hereglegchiin toke oruulah shaardlagatai"})
    }
    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }catch(err){
        return res.status(401).json({sucess: false, message: "Hereglegchiin token buruu baina"})
    }
    return next();
}

module.exports = verifyToken;
