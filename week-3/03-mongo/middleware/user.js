const { User } = require('../db')

// Middleware for handling auth
const userMiddleware = async(req, res, next)=>{
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;

    const isUser = await User.exists({
        username: username,
        password: password
    });

    if (isUser)
        next();
    else{
        return res.status(403).json({
            "uname": username,
            "pword": password,
            "message": "Error encountered - you are not a user!"
        })
    }
}

module.exports = userMiddleware;