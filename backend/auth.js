const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./secret");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(403).json({
            message: "No token provided"
        });
    }

    try{
        const bearerToken = token.split(" ")[1];
        const response = jwt.verify(bearerToken, JWT_SECRET);
        req.userId = response.userId;
        next(); 
    } catch(e) {
        return res.status(403).json({
            message: "incorrect creds"
        })
    }
}

module.exports = auth;