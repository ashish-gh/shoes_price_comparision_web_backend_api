const Express = require('express');
const express = new Express();

const cors = require('cors');
const bodyParser = require('body-parser');

//connction  factory
const knex = require('knex');
const config = require('./knexfile');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const dbClient= knex(config)

//create an express instance /object

// express.use(cors());
express.use(bodyParser.json());



// users
// register user

function registerUser(request, response) {
    // get username
    const email = request.body.email;
    // get password
    const password = request.body.password;
  
    const hashedPassword = bcrypt.hashSync(password, 10);
    dbClient
      .table('users')
      .insert({
        // this must be same for database's column
        email: email,
        password: hashedPassword
      })
      .then(data => {
        response.json({
          status: 'success',
          data: {
            email: email,
          }
        })  
      })
      .catch(error => {
        response.json({
          status: 'fail',
        })
      })
  }
  




function sendStatus(req, resp){
    resp.json({
        status: 'ok'
    })
}

function getComments(req,resp){
    dbClient
    .select('userId', 'foodId', 'comment','timestamp')
    .table('recipeComments')
    .then(data=>{
        resp.json({
            data : data
        })
    })
}

function addComment(req,resp){
    dbClient('recipeComments')
    .insert({
        id : '1',
        userId: '2',
        foodId: '1',
        comment:'It tastes good.',
        timestamp:'2019-1-12'
    })
    .then(val =>{
        resp.json({
            status: 'success'
        })
    })
    .catch(error => {
        resp.json({
            status: 'fail'
        })
        resp.json({
            status: 'ok'
        })
       
    })
}





express.get('/', sendStatus);

// user
express.post('/api/register', registerUser);


// recipeComment
express.get('/api/comment', getComments);
express.post('/api/comment', addComment);



express.listen(8000, 'localhost', ()=> {
    console.log("Server is running at", 8000)
})


