const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const { Admin, User, Course, jwtSecret } = require('../db/index')

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    const userExists = await User.exists( {username: username} );

    if (userExists){
        return res.status(400).json({
            "message": "User already exists!"
        });
    }

    await User.create({
        username: username,
        password: password
    });

    res.json({
        "message": "User created successfully"
    });
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.exists( {username, password} );

    if (!userExists){
        return res.status(400).json({
            "message": "Wrong credentials used!"
        });
    }

    let token;
    let jwtPayload = {username, password};

    try{
        token = jwt.sign(
            jwtPayload,
            jwtSecret, 
            {
                expiresIn: "3d"
            }
        );
    }catch(e){
        console.log(e);
        return res.status(500).json({
            "message": "Unexpected error occured"
        });
    }

    res.json({token});
});

router.get('/courses', async (req, res) => {
    const allCourseInfo = await Course.find();
    res.json({
        courses: allCourseInfo
    });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const authToken = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(authToken, jwtSecret);
    const { username } = decodedToken;
    
    const userData = await User.findOne({username});

    try{
        await User.updateOne({
            username: username,
        }, {
            $push: {
                purchasedCourses: courseId
            }
        })
    } catch(e){
        return res.json({
            "message": "CourseID does not exist or your request failed"
        })
    }

    return res.json({
        "message": "Course purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const authToken = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(authToken, jwtSecret);
    const { username } = decodedToken;
    
    const userData = await User.findOne({username});

    if ((userData.purchasedCourses).length == 0){
        return res.json({
            "message": "User has 0 courses purchased"
        })
    }
    else{
        await userData.populate('purchasedCourses');
        return res.json({
            "Courses purchased by user": userData.purchasedCourses
        })
    }
});

module.exports = router