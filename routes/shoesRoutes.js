const express = require('express');
const app = express();
const shoes = require('../controller/shoesController');
  

app.post('/shoes', shoes.addShoes);


module.exports = app;
      
