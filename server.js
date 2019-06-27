const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


app = express();


const shoesRoutes = require('./routes/shoesRoutes');


//cors
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// route for shoes
app.use('/', shoesRoutes);


module.exports = app;