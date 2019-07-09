
const model = require('../model/reviewModel');


//  add reivew controller
const addReview = (req, res)=>{

    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }

    const reviewDetails = req.body;
    model.addReview(reviewDetails,async function(err, result, dataResult){
        if(dataResult.length == 0){
            res.json({
                status:'fail',
                dataResult:dataResult
            });
        }else if(dataResult.length > 0){
            res.json({
                status:'success',
                dataResult:dataResult
            });
        }else{
            console.log(err)
        }
    });
};


// get review controller
const getReview = (req, res)=>{
    const data = model.getReview(async function(err, result, dataResult){        
        if(!result){
            res.json({
                status:'success',
                dataResult:dataResult,
                message: 'fail'
            });
        }else if(result){
            res.json({
                status:'success',
                dataResult: dataResult
            });
            
        }else{
            console.log(err);
        }
    });
};


//  review by id controller
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


// get review by user controller
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


// get review by shoes controller
const getReviewByShoes = (req, res)=>{

    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }

    const shoesId = req.params.shoesId;
    const data = model.getReviewByShoes(shoesId, async function(err, result, dataResult){
        if(dataResult.length == 0){
            res.json({
                status:'fail',
                dataResult:dataResult
            });
        }else if(dataResult.length > 0){
            res.json({
                status:'success',
                dataResult: dataResult
            });            
        }else{
            console.log(err);
        }
    });
};


// delete review controller
const deleteReview = (req, res)=>{

    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }
    const reviewId = req.params.reviewId;
    const data =model.deleteReview(reviewId, async function(err, result, dataResult){
        console.log("this is data result " +dataResult);
        
        if(dataResult == 0){
            res.json({
                status:'fail',
                dataResult:dataResult
            });
        }else if(dataResult > 0){
            res.json({
                status:'success',
                dataResult:dataResult
            });
        }else{
            console.log(err);
        }
    });
};




async function notAuthenticated(req) {
    req.json({
      status: 'fail',
      message: 'Not Authenticated',
      code: 404
    });
  }



module.exports =  {
    addReview, 
    getReview,
    getReviewById,
    getReviewByShoes,
    getReviewByUser,
    deleteReview, 
 }
