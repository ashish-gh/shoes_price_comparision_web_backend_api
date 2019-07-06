const express = require('express');
const app = express();
const user = require('../controller/userController');
  
// user registration
app.post('/users/register', user.register);

// user login
app.post('/users/auth', user.login);

// user lists
app.get('/users', user.getUsers)

// user lists
app.get('/users/:userId', user.getUserById)

// user lists by email
app.get('/users/:email/users', user.getUserByEmail)

// user update
app.put('/users/:userId', user.updateUser)

// user update
app.delete('/users/:userId', user.deleteUser)


module.exports = app;
      
