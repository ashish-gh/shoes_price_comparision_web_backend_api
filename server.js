const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


app = express();


const shoesRoutes = require('./routes/shoesRoutes');
<<<<<<< HEAD
=======
const storeRoutes = require('./routes/storeRoutes');
>>>>>>> store


//cors
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route for shoes
app.use('/', shoesRoutes);

<<<<<<< HEAD
=======
// route for store
app.use('/', storeRoutes);

>>>>>>> store

module.exports = app;