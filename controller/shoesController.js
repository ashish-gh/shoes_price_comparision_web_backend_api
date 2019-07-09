
const model = require('../model/shoesModel');

// controller to add shoes
const addShoes = (req, res)=>{
    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }

    const shoesDetails = req.body;
    model.addShoes(shoesDetails,async function(err, result){
        if(!result){
            res.json({
                status:'fail',
                success:result,
                message: "Not added",
                error: err,
            });
        }else if(result){
            res.json({
                status:'success',
                result:result,
                success:result,
                message:"added"
            });
        }else{
            console.log(err)
        }
    });
};


// controller to get shoes
const getShoes = (req, res)=>{

    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }

    const data = model.getShoes(async function(err, result, dataResult){
        if(!result){
            res.json({
                status:'fail',
                success:result,
                message: 'data not retreived'
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


// controller to get shoes by id
const getShoesById = (req, res)=>{
    
    const shoesId = req.params.shoesId;
    const data = model.getShoeById(shoesId, async function(err, result, dataResult){
            
        if(dataResult.length == 0){
            res.json({
                status:'fail',
                dataResult:dataResult
            });
        }else if(dataResult.length > 0){            
            res.json({
                status: 'success',
                dataResult: dataResult
            });
            
        }else{
            console.log("Error:" + err);
        }
    });
};


// controller to get shoes by name
const getShoesByName = (req, res)=>{

    
    const shoesName = req.params.shoesName;

    const data = model.getShoesByName(shoesName, async function(err, result, dataResult){    
        if(dataResult.length == 0){        
            res.json({
                status:'fail',
                message: 'data not retreived'
            });
        }else if(dataResult.length > 0){            
            res.json({
                status: 'success',
                dataResult: dataResult
            });            
        }else{
            console.log(err);
        }
    });
};


// controlller to deleteshoes
const deleteShoes = (req, res)=>{
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
    const data =model.deleteShoes(shoesId, async function(err, result, dataResult){
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


// controller to update shoes
const updateShoes = (req, res)=>{

    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }

    const shoesName = req.body.shoesName;
    const shoesBrand = req.body.shoesBrand;
    const shoesPrice = req.body.shoesPrice;
    const shoesDescription = req.body.shoesDescription;
    const shoesImageName = req.body.shoesImageName;
    const shopId = req.body.shopId;

    const shoesId = req.params.shoesId;
    const data =model.updateShoes(shoesId, shoesName, shoesBrand,shoesPrice,shoesDescription,shoesImageName,shopId, async function(err, result,dataResult){
        if(!result){
            res.json({
                status:'fail',
                message: 'data not updated',
                dataResult:dataResult
            });
        }else if(result){
            res.json({
                status:'success',
                dataResult:dataResult
            });
        }else{
            console.log(err);
        }
    });
};


// controller to upload image 
const uploadImage = (req, res)=>{
    
    const token = req.headers.authorization;
    if(token.length < 5){
        notAuthenticated(res);
        return;
    }

    const data =model.uploadImage(async function(err, result){
        if(!result){
            res.json({
                result:result,
                success: result,
                message: 'data not updated'
            });
        }else if(result){
            res.json({
                result: result,
                message:'data update',
                dataResult:dataResult

            });
        }else{
            console.log(err);
        }
    });
};

// to check is user is authenticated or not
async function notAuthenticated(req) {
    req.json({
      status: 'fail',
      message: 'Not Authenticated',
      code: 404
    });
  }




module.exports =  {
    addShoes, 
    getShoes,
    deleteShoes, 
    getShoesById, 
    getShoesByName ,
    updateShoes,
    uploadImage,
 }
