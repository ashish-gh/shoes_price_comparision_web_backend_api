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

// handlers for recipe

// function getRecipes(req,resp){
//     dbClient
//     .select('name', 'description')
//     .table('recipe')
//     .then(data=>{
//         resp.json({
//             data : data
//         })
//     })
// }


// function addRecipe(req,resp){
//     dbClient('recipe')
//     .insert({
//         id : '7',
//         name: 'Toast',
//         description: 'Fried Toast'
//     })
//     .then(val =>{
//         resp.json({
//             status: 'success'
//         })
//     })
//     .catch(error => {
//         resp.json({
//             status: 'fail'
//         })
//         resp.json({
//             status: 'ok'
//         })
       
//     })
// }




express.get('/', sendStatus);
// express.get('/api/user', getUsers);
// express.post('/api/user', addUser);

// recipe
// express.get('/api/recipe', getRecipes);
// express.post('/api/recipe', addRecipe);

// recipeComment
express.get('/api/comment', getComments);
express.post('/api/comment', addComment);



express.listen(8000, 'localhost', ()=> {
    console.log("Server is running at", 8000)
})


