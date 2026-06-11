const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vineet:48XLoxT3B2lESTei@course-selling-app.l6jatk3.mongodb.net/course-selling-app-jwt');
const jwtSecret = "f5f4c2f0b7f9d1e4a8c6e7b2d9a3f1c8e5d7b4a9f2c6e1d8b3a7f5c9e2d4b8a1";

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: { type: Boolean, default: false }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
    jwtSecret
}