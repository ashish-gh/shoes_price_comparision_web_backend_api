
const model = require('../model/shopModel');


// controller to add shop
const addShop = (req, res)=>{
    
    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }

    const shopDetails = req.body;    
    model.addShop(shopDetails,async function(err, result, dataResult){
        
        if(dataResult.length == 0 ){
            res.json({
                status:'fail',
                dataResult:dataResult
            });
        }else if(dataResult.length > 0){
            res.json({
                status: 200,
                dataResult:dataResult
            });
        }else{
            console.log(err)
        }
    });
};


// controller to get shop
const getShop = (req, res)=>{

    const data = model.getShop(async function(err, result, dataResult){
        if(!result){
            res.json({
                result:result,
                success:result,
                message: 'fail'
            });
        }else if(result){
            res.json({
                status:200,
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

// controller to get shop by id
const getShopById = (req, res)=>{
    
    const shopId = req.params.shopId;
    const data = model.getShopById(shopId, async function(err, result, dataResult){

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
            console.log(err);
        }
    });
};


// controller to delete shop
const deleteShop = (req, res)=>{

    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }

    const shopId = req.params.shopId;
    
    const data =model.deleteShop(shopId, async function(err, result, dataResult){
        if(dataResult == 0){
            res.json({
                status: 'success',
                dataResult:dataResult
            });
        }else if(dataResult > 0){
            res.json({
                status:'success',
                dataResult: dataResult
            });
        }else{
            console.log(err);
        }
    });
};


// controller to update shop
const updateShop = (req, res)=>{

    const token = req.headers.authorization;
    console.log(token);
    if(token==undefined){
        notAuthenticated(res);
        return;
    }else if(token.length <5){
        notAuthenticated(res);
        return;
    }


    const shopName= req.body.shopName;
    const shopLocation = req.body.shopLocation;
    const shopDescription = req.body.shopDescription;    
    const shopId = req.params.shopId;
    
    const data = model.updateShop(shopId, shopName, shopLocation,shopDescription, async function(err, result,dataResult){
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
    addShop, 
    getShop,
    deleteShop, 
    getShopById,
    updateShop
 }
