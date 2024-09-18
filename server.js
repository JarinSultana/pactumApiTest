const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Dummy database for users (in-memory array for simplicity)
let users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];

// Dummy GET endpoint - get user by ID
app.get('/api/user/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Dummy POST endpoint - create new user
app.post('/api/user', (req, res) => {
    const user = req.body;
    if (user.name && user.email) {
        const newUser = {
            id: users.length + 1,  // Incremental ID
            ...user
        };
        users.push(newUser);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } else {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Dummy PUT endpoint - update existing user (full replacement)
app.put('/api/user/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex >= 0) {
        const updatedUser = {
            id: users[userIndex].id,  // Keep the same ID
            name: req.body.name,
            email: req.body.email
        };
        if (updatedUser.name && updatedUser.email) {
            users[userIndex] = updatedUser;
            res.status(200).json({
                message: 'User updated successfully',
                user: updatedUser
            });
        } else {
            res.status(400).json({ error: 'Invalid data' });
        }
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Dummy PATCH endpoint - partially update existing user
app.patch('/api/user/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex >= 0) {
        const user = users[userIndex];
        const updatedUser = {
            ...user,
            ...req.body  // Only update provided fields
        };
        users[userIndex] = updatedUser;
        res.status(200).json({
            message: 'User partially updated successfully',
            user: updatedUser
        });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Dummy DELETE endpoint - delete user by ID
app.delete('/api/user/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex >= 0) {
        users.splice(userIndex, 1);
        res.status(200).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Dummy API running at http://localhost:${port}`);
});
