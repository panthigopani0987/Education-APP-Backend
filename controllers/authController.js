const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register a new User
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({
            name,
            email,
            password,
            role
        });
        await user.save();
        res.status(201).json({ message: 'User Register' });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
//login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    register,
    login
}