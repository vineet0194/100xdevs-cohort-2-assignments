const { Admin } = require('../db')

// Middleware for handling auth
const adminMiddleware = async(req, res, next)=>{
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const { username, password } = req.headers;

    const isAdmin = await Admin.exists({
        username: username,
        password: password
    });

    if (isAdmin)
        next();
    else{
        return res.status(403).json({
            "uname": username,
            "pword": password,
            "message": "Error encountered - you are not an admin!"
        })
    }
}

module.exports = adminMiddleware;