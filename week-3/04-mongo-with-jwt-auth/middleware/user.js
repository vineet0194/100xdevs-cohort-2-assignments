const jwt = require('jsonwebtoken');
const { User, jwtSecret } = require('../db/index')

// Middleware for handling auth
const userMiddleware = async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(403).json({
            "message": "Authorization header not provided"
        })
    }

    const authToken = authHeader.split(" ")[1];

    if (!authToken){
        return res.status(400).json({
            "message": "JWT not provided"
        })
    }

    let verifiedToken;
    try{
        verifiedToken = jwt.verify(authToken, jwtSecret);
        const { username, password } = verifiedToken;
        const userExists = await User.exists({username, password});
        if (!userExists){
            return res.status(403).json({
                "message": "Sorry, you are not a valid user"
            })
        }
    } catch(e){
        return res.status(400).json({
            "message": "Invalid JWT"
        })
    }

    next();
}

module.exports = userMiddleware;