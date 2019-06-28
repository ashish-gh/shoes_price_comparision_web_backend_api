const express = require('express');
const app = express();
const shoes = require('../controller/shoesController');
  

app.post('/shoes', shoes.addShoes);
app.get('/shoes', shoes.getShoes);
app.delete('/shoes/:shoesId', shoes.deleteShoes);


module.exports = app;
      
