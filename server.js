const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


app = express();


const shoesRoutes = require('./routes/shoesRoutes');
const storeRoutes = require('./routes/storeRoutes');
const reviewRoute = require('./routes/reviewRoutes');


//cors
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route for shoes
app.use('/', shoesRoutes);

// route for store
app.use('/', storeRoutes);

// route for reivew
app.use('/', reviewRoute)


module.exports = app;