const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./secret");
const { User } = require("./db");

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(403).json({
            message: "No token provided"
        });
    }

    try{
        const bearerToken = token.split(" ")[1];
        const response = jwt.verify(bearerToken, JWT_SECRET);
        const user = await User.findOne({ username: response.username});
        if(!user) {
            return res.status(401).json({message: "Invalid token"})
        }
        req.user = { _id: user._id, username: user.username};
          next(); 
    } catch(e) {
        return res.status(403).json({
            message: "incorrect creds"
        })
    }
}


module.exports = auth;