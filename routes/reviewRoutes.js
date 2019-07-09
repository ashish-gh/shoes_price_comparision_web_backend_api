const express = require('express');
const app = express();
const review = require('../controller/reviewController');
  
// add review route 
app.post('/review', review.addReview);

// get review route
app.get('/review', review.getReview);

// get review by id route
app.get('/review/:reviewId', review.getReviewById);

// get review by user route
app.get('/review/:userId/user', review.getReviewByUser);

// get review by shoes route
app.get('/review/:shoesId/shoes', review.getReviewByShoes);

// delete reivew route
app.delete('/review/:reviewId', review.deleteReview);



module.exports = app;
      
