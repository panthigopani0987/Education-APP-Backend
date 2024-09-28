const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const app = express();

//env file and database connection
dotenv.config();
connectDB();

//middleware
app.use(express.json());
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.message });
};
app.use(errorHandler);

//routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grades', gradeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    process.exit();
});
