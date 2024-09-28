const Grade = require('../models/Grade');

//assign grade
const assignGrade = async (req, res) => {
    const { courseId, studentId, grade } = req.body;
    try {
        const newGrade = new Grade({ course: courseId, student: studentId, grade });
        await newGrade.save();
        res.status(201).json(newGrade);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all grade
const getGrades = async (req, res) => {
    try {
        const id = req.params.studentId;
        const grades = await Grade.find({ student: id }).populate('course');
        res.json(grades);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { assignGrade, getGrades };
