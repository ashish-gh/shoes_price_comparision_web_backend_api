const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


app = express();


const reviewRoute = require('./routes/reviewRoutes');


//cors
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route for reivew
app.use('/', reviewRoute)


module.exports = app;