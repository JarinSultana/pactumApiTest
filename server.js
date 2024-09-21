const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Connect to MongoDB (adjust the connection string if needed)
mongoose.connect('mongodb://localhost:27017/usersdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});


app.use(express.json());

const User = require('./models/User');

// Dummy POST endpoint - create new user
app.post('/api/user', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email
        });
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error occurred while creating user:', error);
        res.status(400).json({ error: 'Invalid data or user already exists' });
    }
});

// GET user by email
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }); // Query by email
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PATCH user by email
app.patch('/api/user/:email', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },   // Query by email
            req.body,                      // Update data
            { new: true }                  // Return the updated user
        );
        if (updatedUser) {
            res.status(200).json({
                message: 'User partially updated successfully',
                user: updatedUser
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
// PUT user by email
app.put('/api/user/:email', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },   // Query by email
            req.body,                      // Update data
            { new: true }                  // Return the updated user
        );
        if (updatedUser) {
            res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


// DELETE user by email
app.delete('/api/user/:email', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ email: req.params.email }); // Query by email
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Dummy API running at http://localhost:${port}`);
});
