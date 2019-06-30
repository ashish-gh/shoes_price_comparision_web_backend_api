const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


app = express();


<<<<<<< HEAD
const shoesRoutes = require('./routes/shoesRoutes');
const storeRoutes = require('./routes/storeRoutes');
=======
const reviewRoute = require('./routes/reviewRoutes');
>>>>>>> review


//cors
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


<<<<<<< HEAD
// route for shoes
app.use('/', shoesRoutes);

// route for store
app.use('/', storeRoutes);
=======
// route for reivew
app.use('/', reviewRoute)
>>>>>>> review


module.exports = app;