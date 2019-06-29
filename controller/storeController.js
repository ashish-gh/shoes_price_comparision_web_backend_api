
const model = require('../model/storeModel');

const addStore = (req, res)=>{
    const storeDetails = req.body;
    model.addStore(storeDetails,async function(err, result){
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



const getStore = (req, res)=>{
    const data = model.getStore(async function(err, result, dataResult){
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


const getStoreById = (req, res)=>{
    const storeId = req.params.storeId;
    const data = model.getStoreById(storeId, async function(err, result, dataResult){
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


const deleteStore = (req, res)=>{
    const storeId = req.params.storeId;
    const data =model.deleteStore(storeId, async function(err, result){
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



const updateStore = (req, res)=>{
    const storeName= req.body.storeName;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    
    const storeId = req.params.storeId;
    const data = model.updateStore(storeId, storeName, latitude,longitude, async function(err, result,dataResult){
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
    addStore, 
    getStore,
    deleteStore, 
    getStoreById,
    updateStore
 }
