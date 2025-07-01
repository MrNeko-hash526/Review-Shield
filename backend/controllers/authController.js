const User = require('../models/User');

const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expiration time
    });
}

// register user
exports.registerUser = async (req, res) => {
    console.log("DEBUG req.body ===>", req.body);
    const { fullName, email, password, profileImageUrl } = req.body;

    // validate input
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        // Generate JWT token
        const token = generateToken(user._id);

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// login user
exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    // validate input
    if (!email || !password ){
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    try{
        const user = await User.findOne({ email });
        if (!user|| !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            id: user._id,   
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }

};

// get user info
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -__v");

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user info', error: error.message });
    }
};