const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://vineet:48XLoxT3B2lESTei@course-selling-app.l6jatk3.mongodb.net/');

// Define schemas
// Body: { username: 'admin', password: 'pass' }
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

// { username: 'user', password: 'pass' }
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

// Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
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
    Course
}