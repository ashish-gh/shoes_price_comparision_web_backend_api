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
express.get('/', sendStatus);


express.listen(8000, 'localhost', ()=> {
    console.log("Server is running at", 8000)
})


