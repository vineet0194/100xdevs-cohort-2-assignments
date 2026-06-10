const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, User, Course } = require('../db/index')

// User Routes
router.post('/signup', async(req, res) => {
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

router.get('/courses', async(req, res) => {
    const allCourseInfo = await Course.find();
    res.json({
        courses: allCourseInfo
    });
});

// how to extract parameters from URL
router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const { username, password } = req.headers;

    // since there is a reference from user to course, you must use a courseId that is
    // indeed present in the course collection or it will raise an error
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

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const { username, password } = req.headers;

    const userData = await User.findOne( {username: username} );

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