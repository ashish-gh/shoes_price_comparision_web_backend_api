const express = require('express');
const app = express();
const shop = require('../controller/shopController');
  
// route to add shop
app.post('/shop', shop.addShop);

// route to get shop list
app.get('/shop', shop.getShop);

// route to delete shop
app.delete('/shop/:shopId', shop.deleteShop);

// route to get shop by id
app.get('/shop/:shopId', shop.getShopById);

// route to update shop
app.put('/shop/:shopId', shop.updateShop);


module.exports = app;
      
