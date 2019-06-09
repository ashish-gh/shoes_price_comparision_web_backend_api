const Express = require('express');
const express = new Express();

const cors = require('cors');
const bodyParser = require('body-parser');

//connction  factory
const knex = require('knex');
const config = require('./knexfile');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




//create an express instance /object

express.use(cors());
express.use(bodyParser.json());

// this is client connection
const dbClient= knex(config)
const SECRET_KEY = 'secret_key';


// get version

function getVersion(req, res) {
  // send me a version
  res.json({version: '0.0.0'});           
}


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
          error: error.toString()
        })
      })
  }
  

// create a auth handler
async function authenticate(request, response) {
  
  const email = request.body.email;
  const passwordFromJSON = request.body.password;

  const data = await dbClient.table('users').first('password').where('email', email);
  if (!data) {
    response.json({
      status: 'fail',
      message: 'User not found'
    })
  } else {
    const password = data.password;
    const isMatch = bcrypt.compareSync(passwordFromJSON, password);
    if (isMatch) {
      // password matched
      response.json({
        status: 'success',
        accessToken: jwt.sign({
          email: email
        }, SECRET_KEY)
      })
   } else {
     response.json({
       status: 'fail',
       message:'not matched password',
     })
   }
  } 
}



function notAuthenticated(response) {
  response.json({
    status: 'fail',
    message: 'Not Authenticated',
    code: 404
  });
}


function _authenticate(token) { //token -> 123123789127389213
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return true;
    // use payload if required
  } catch(error) {
    return false
  }
}



async function getUsers(request, response) {
  if (_authenticate(request.headers.authorization) === false) {
    notAuthenticated(response);
    return;
  }
  try {
    const data = await dbClient.table('users').select('email');
    response.json({
      status:'success',
      data: data
    })
  } catch(error) {
    notAuthenticated(response);
    error:error.toString()
    return;
  }
}

function getUser(request, response) {
  const isAuthenticated = _authenticate(request.headers.authorization);
  if (!isAuthenticated) {
    notAuthenticated(response);
    return;
  }
  dbClient
    .table('users')
    .where({
      email: request.params.email
    })
    .select('email', 'password')
    .then(data => {
      response.json({
        status: 'success',
        data: data
      })
    })
    .catch(error => {
      response.json({
        status: 'fail',
        error: error.toString()
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
express.post('/api/auth', authenticate); // 1


// recipeComment
express.get('/api/comment', getComments);
express.post('/api/comment', addComment);



express.listen(8005, 'localhost', ()=> {
    console.log("Server is running at", 8005)
})


