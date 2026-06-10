const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, User, Course } = require('../db/index')

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const adminExists = await Admin.exists( {username: username} );

    if (adminExists){
        return res.status(400).json({
            "message": "Admin already exists!"
        });
    }
    
    await Admin.create({
        username: username,
        password: password
    });

    return res.json({
        "message": 'Admin created successfully'
    });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const { title, description, price, imageLink } = req.body;

    const courseExists = await Course.exists( {title: title} );

    if (courseExists){
        return res.status(400).json({
            "message": "Course already exists!"
        });
    }

    await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    });

    const courseDetails = await Course.findOne({ title: title });

    return res.json({
        message: "Course created successfully",
        courseId: courseDetails._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const allCourseInfo = await Course.find();
    res.json({
        courses: allCourseInfo
    });
});

module.exports = router;