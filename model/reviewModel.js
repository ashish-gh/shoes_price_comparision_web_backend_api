const config = require('../knexfile');
const path = require('path');
const knex = require('knex');
const dbClient = knex(config);

// to add review on shoes
const addReview = async function addReview(review, res){
try{
    const data = await dbClient('review')
    .insert({
        review:review.review,
        userId: review.userId,
        shoesId: review.shoesId,
        reviewDate: review.reviewDate
    });

        res(null, true, data);
    }
    catch(err) {
        res(null, false);
        console.log("error:", err);
    }
};


// to delete review
const deleteReview = async function deleteReview(reviewId, res){
    try{
        
        const data = await dbClient
        .table('review')
        .where('reviewId', reviewId)
        .del();
        res(null, true, data);
        
    }catch(error){
        res(null, false);   
        console.log("error: ", error);
    }
};


// to get all reviews
const getReview = async function getReview(res){
    try{
        
        const data = await dbClient.table('review').select('');
        res(null, true, data);
        
    }catch{
        res(null, false);
    }
};

// to get review from review id
const getReviewById = async function getReviewById(reviewId, res){
    try{
        const data = await dbClient
        .table('review')
        .where('reviewId', reviewId)
        .select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};

// to get reivew by shoes
const getReviewByShoes = async function getReviewByShoes(shoesId, res){
    try{
        const data = await dbClient
        .table('review')
        .where('shoesId', shoesId)
        .select('');
        res(null, true, data);        
    }catch{
        res(null, false);
    }
};


// to get review from user
const getReviewByUser = async function getReviewByUser(userId, res){
    try{
        const data = await dbClient
        .table('review')
        .where('userId', userId)
        .select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};



module.exports ={
    addReview, 
    getReview, 
    deleteReview, 
    getReviewById, 
    getReviewByShoes,
    getReviewByUser
}
    