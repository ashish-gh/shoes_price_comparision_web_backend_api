const express = require('express');
const app = express();
const shoes = require('../controller/shoesController');
  
// route to  add shoes
app.post('/shoes', shoes.addShoes);

// route to get shoes
app.get('/shoes', shoes.getShoes);

// route to get shoes by name
app.get('/shoes/:shoesName/shoes', shoes.getShoesByName);

// route to delete shoes
app.delete('/shoes/:shoesId', shoes.deleteShoes);

// route to update shoes
app.put('/shoes/:shoesId', shoes.updateShoes);

// route to get shoes by id
app.get('/shoes/:shoesId', shoes.getShoesById);

// route to upload image
app.post('/upload', shoes.uploadImage);



module.exports = app;
      
