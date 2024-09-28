const Course = require('../models/Course');

//create a new course
const createCourse = async (req, res) => {
    const { title, description, teacher } = req.body

    try {
        const course = new Course({
            title,
            description,
            teacher
        });
        await course.save();
        res.status(201).json(course);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//eroll
const enrollStudent = async (req, res) => {
    const { courseId, studentId } = req.body;
    try {
        const course = await Course.findById(courseId);
        course.students.push(studentId);

        await course.save();
        res.json(course);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get course
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher').populate('students');
        res.json(courses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createCourse,
    enrollStudent,
    getCourses
}