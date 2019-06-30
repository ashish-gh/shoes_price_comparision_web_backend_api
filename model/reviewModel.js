const config = require('../knex');
const path = require('path');
const knex = require('knex');
const dbClient = knex(config);

const addReview = async function addReview(review, res){
try{
    const data = await dbClient('review').insert(review);
        res(null, true);
    }
    catch(err) {
        res(null, false);
        console.log("error:", error);
    }
};

const deleteReview = async function deleteReview(reviewId, res){
    try{
        await dbClient
        .table('review')
        .where('reviewId', reviewId)
        .del();
        res(null, true);
    }catch(error){
        res(null, false);   
        console.log("error: ", error);
    }
};

const getReview = async function getReview(res){
    try{
        const data = await dbClient.table('review').select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


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


const updateReview = async function updateReview(reviewId,review, userId, shoesId,reviewDate, res){
    try{
        const data = await dbClient
        .table('review')
        .where('reviewId', reviewId)
        .update({
            review : review,
            userId : userId,
            shoesId: shoesId,
            reviewDate: reviewDate
        });
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
    updateReview,
    getReviewByUser
}
    