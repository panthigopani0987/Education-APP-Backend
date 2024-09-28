const express = require('express');
const { assignGrade, getGrades } = require('../controllers/gradeController');
const authMiddleware = require('../middlewares/authMiddleware');
const routes = express.Router();

routes.post('/', authMiddleware, assignGrade);
routes.get('/:studentId', authMiddleware, getGrades);

module.exports = routes;
