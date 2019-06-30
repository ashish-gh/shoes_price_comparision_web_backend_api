const express = require('express');
const app = express();
const review = require('../controller/reviewController');
  
// 
app.post('/review', review.addReview);

// 
app.get('/review', review.getReview);

// 
app.get('/review/:reviewId', review.getReviewById);

// 
app.get('/review/:userId/user', review.getReviewByUser);

// 
app.get('/review/:shoesId/shoes', review.getReviewByShoes);

// 
app.put('/review/:reviewId', review.updateReview)

// 
app.delete('/review/:reviewId', review.deleteReview);



module.exports = app;
      
