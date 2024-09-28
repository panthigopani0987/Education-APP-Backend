const express = require('express');
const { createCourse, enrollStudent, getCourses } = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');
const routes = express.Router();

routes.post('/', authMiddleware, restrictTo('Admin', 'Teacher'), createCourse);
routes.post('/enroll', authMiddleware, enrollStudent);
routes.get('/', authMiddleware, getCourses);

module.exports = routes;