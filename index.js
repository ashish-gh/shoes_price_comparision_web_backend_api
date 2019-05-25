const Express = require('express');
const express = new Express();

const cors = require('cors');
const bodyParser = require('body-parser');

//connction  factory
const knex = require('knex');
const config = require('./knexfile');

const dbClient= knex(config)

//create an express instance /object

express.use(bodyParser.json())





function sendStatus(req, resp){
    resp.json({
        status: 'ok'
    })
}

function getUsers(req,resp){
    dbClient
    .select('email', 'password')
    .table('users')
    .then(data=>{
        resp.json({
            data : data
        })
    })
}

function addUser(req,resp){
    dbClient('users')
    .insert({
        id : '7',
        email: 'username',
        password: 'password'
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

// handlers for recipe

function getRecipes(req,resp){
    dbClient
    .select('name', 'description')
    .table('recipe')
    .then(data=>{
        resp.json({
            data : data
        })
    })
}


function addRecipe(req,resp){
    dbClient('recipe')
    .insert({
        id : '7',
        name: 'Toast',
        description: 'Fried Toast'
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
express.get('/api/user', getUsers);
express.post('/api/user', addUser);

// recipe
express.get('/api/recipe', getRecipes);
express.post('/api/recipe', addRecipe);



express.listen(8000, 'localhost', ()=> {
    console.log("Server is running at", 8000)
})


