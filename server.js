const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


app = express();


const shoesRoutes = require('./routes/shoesRoutes');
const shopRoutes = require('./routes/shopRoutes');
const reviewRoute = require('./routes/reviewRoutes');
const userRoute = require('./routes/userRoutes');


//cors
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route for shoes
app.use('/', shoesRoutes);

// route for store
app.use('/', shopRoutes);

// route for reivew
app.use('/', reviewRoute)

// route for user
app.use('/', userRoute)


module.exports = app;