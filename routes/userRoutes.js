const express = require('express');
const app = express();
const user = require('../controller/userController');
  
// user registration
app.post('/users/register', user.register);

// user login
app.post('/users/auth', user.login);

// user lists
app.get('/users', user.getUsers)

// user list by user id
app.get('/users/:userId', user.getUserById)

// user lists by email
app.get('/users/:email/users', user.getUserByEmail)

// user update
app.put('/users/:userId', user.updateUser)

// user delete
app.delete('/users/:userId', user.deleteUser)


module.exports = app;
      
