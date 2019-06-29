const express = require('express');
const app = express();
const store = require('../controller/storeController');
  

app.post('/store', store.addStore);

app.get('/store', store.getStore);

app.delete('/store/:storeId', store.deleteStore);

app.get('/store/:storeId', store.getStoreById);

app.put('/store/:storeId', store.updateStore);


module.exports = app;
      
