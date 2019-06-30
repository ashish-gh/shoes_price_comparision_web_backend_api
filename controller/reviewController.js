
const model = require('../model/reviewModel');

const addReview = (req, res)=>{
    const reviewDetails = req.body;
    model.addReview(reviewDetails,async function(err, result){
        if(!result){
            res.json({
                success:result,
                message: "fail",
                error: err,
            });
        }else if(result){
            res.json({
                result:result,
                success:result,
                message:"success"
            });
        }else{
            console.log(err)
        }
    });
};



const getReview = (req, res)=>{
    const data = model.getReview(async function(err, result, dataResult){
        if(!result){
            res.json({
                result:result,
                success:result,
                message: 'fail'
            });
        }else if(result){
            res.json({
                success: result,
                message:'success',
                data: data.toString(),
                dataResult: dataResult
            });
            
        }else{
            console.log(err);
        }
    });
};


const getReviewById = (req, res)=>{
    const reviewId = req.params.reviewId;
    const data = model.getReviewById(reviewId, async function(err, result, dataResult){
        if(!result){
            res.json({
                result:result,
                success:result,
                message: 'fail'
            });
        }else if(result){
            res.json({
                success: result,
                message:'success',
                data: data.toString(),
                dataResult: dataResult
            });            
        }else{
            console.log(err);
        }
    });
};

const getReviewByUser = (req, res)=>{
    const userId = req.params.userId;
    const data = model.getReviewByUser(userId, async function(err, result, dataResult){
        if(!result){
            res.json({
                result:result,
                success:result,
                message: 'fail'
            });
        }else if(result){
            res.json({
                success: result,
                message:'success',
                data: data.toString(),
                dataResult: dataResult
            });            
        }else{
            console.log(err);
        }
    });
};


const getReviewByShoes = (req, res)=>{
    const shoesId = req.params.shoesId;
    const data = model.getReviewByShoes(shoesId, async function(err, result, dataResult){
        if(!result){
            res.json({
                result:result,
                success:result,
                message: 'fail'
            });
        }else if(result){
            res.json({
                success: result,
                message:'success',
                data: data.toString(),
                dataResult: dataResult
            });            
        }else{
            console.log(err);
        }
    });
};



const deleteReview = (req, res)=>{
    const reviewId = req.params.reviewId;
    const data =model.deleteReview(reviewId, async function(err, result){
        if(!result){
            res.json({
                result:result,
                success: result,
                message: 'fail'
            });
        }else if(result){
            res.json({
                result: result,
                message:'success'
            });
        }else{
            console.log(err);
        }
    });
};



const updateReview = (req, res)=>{
    const review= req.body.review;
    const userId = req.body.userId;
    const shoesId = req.body.shoesId;
    const reviewDate = req.body.reviewDate;
    
    const reviewId = req.params.reviewId;
    const data = model.updateReview(reviewId, review, userId,shoesId,reviewDate, async function(err, result,dataResult){
        if(!result){
            res.json({
                result:result,
                success: result,
                message: 'fail'
            });
        }else if(result){
            res.json({
                result: result,
                message:'success',
                dataResult:dataResult
            });
        }else{
            console.log(err);
        }
    });
};


module.exports =  {
    addReview, 
    getReview,
    getReviewById,
    getReviewByShoes,
    getReviewByUser,
    deleteReview, 
    updateReview
 }
