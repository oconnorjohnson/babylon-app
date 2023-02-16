// Import necessary modules to run the server
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = 5000;

const { User } = require('./models/user');

// Load environment variables from the .env file
require('dotenv').config();

// Create an instance of express
const app = express();

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

// Define middleware for parsing the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB via Mongoose 
mongoose.connect('mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}', { useNewUrlParser: true })
mongoose.connect('mongodb+srv://oconnorjohnson:C19lrEdkHaFqdbLF@babylon-cluster-0.z3nlhad.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

// Define Mongoose schema for the user model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Define routes for user authentication and authorization 
app.post('/api/register', async (req, res) => { // Register a new user
    try {
        const { email, password } = req.body; // Destructure the email and password from the request body
        const existingUser = await User.findOne({ email }); // Check if the user already exists

        if (existingUser) { // If the user already exists, return an error
            return res.status(400).json({ message: 'Email already in use'}) // 400 is a bad request
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const user = new User({ // Create a new user
            email,
            password: hashedPassword
        });

        await user.save(); // Save the user to the database

        res.status(201).json({ message: 'User registered successfully' }); // 201 is a successful creation
    } catch (err) { // If there is an error, return a 500 error
        res.status(500).json({ message: 'Internal server error' }); // 500 is an internal server error
    }
});

// Login an existing user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure the email and password from the request body

        const user = await User.findOne({ email }); // Check if the user exists

        if (!user) { // If the user does not exist, return an error
            return res.status(400).json({ message: 'Invalid credentials' }); // 400 is a bad request
        }

        const passwordMatch = await bcrypt.compare(password, user.password); // Check if the password matches

        if (!passwordMatch) { // If the password does not match, return an error
            return res.status(400).json({ message: 'Invalid credentials' }); // 400 is a bad request
        }

        const token = jwt.sign({ email: user.email }, 'secret-key', { expiresIn: '1h' }); // Create a JWT token

        res.json({ token }); // Return the token
    } catch (err) { // If there is an error, return a 500 error
        res.status(500).json({ message: 'Internal server error' }); // 500 is an internal server error
    }
});

module.exports = { User };