
const model = require('../model/shoesModel');

const addShoes = (req, res)=>{
    const shoesDetails = req.body;
    model.addShoes(shoesDetails,async function(err, result){
        if(!result){
            res.json({
                success:result,
                message: "Not added",
                error: err,
            });
        }else if(result){
            res.json({
                result:result,
                success:result,
                message:"added"
            });
        }else{
            console.log(err)
        }
    });
};


const getShoes = (req, res)=>{
    const data = model.getShoes(async function(err, result, dataResult){
        if(!result){
            res.json({
                result:result,
                success:result,
                message: 'data not retreived'
            });
        }else if(result){
            res.json({
                success: result,
                message:'data retreived',
                data: data.toString(),
                dataResult: dataResult
            });
            
        }else{
            console.log(err);
        }
    });
};


const deleteShoes = (req, res)=>{
    const shoesId = req.params.shoesId;
    const data =model.deleteShoes(shoesId, async function(err, result){
        if(!result){
            res.json({
                result:result,
                success: result,
                message: 'data not deleted'
            });
        }else if(result){
            res.json({
                result: result,
                message:'data deleted'
            });
        }else{
            console.log(err);
        }
    });
};


const updateShoes = (req, res)=>{
    const shoesName = req.body.shoesName;
    const shoesBrand = req.body.shoesBrand;
    const shoesPrice = req.body.shoesPrice;
    const shoesDescription = req.body.shoesDescription;
    const shoesImageName = req.body.shoesImageName;

    const shoesId = req.params.shoesId;
    const data =model.updateShoes(shoesId, shoesName, shoesBrand,shoesPrice,shoesDescription,shoesImageName, async function(err, result,dataResult){
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


const getShoesById = (req, res)=>{
    const shoesId = req.params.shoesId;
    const data = model.getShoesById(shoesId, async function(err, result, dataResult){
        if(!result){
            res.json({
                result:result,
                success:result,
                message: 'data not retreived'
            });
        }else if(result){
            res.json({
                success: result,
                message:'data retreived',
                data: data.toString(),
                dataResult: dataResult
            });
            
        }else{
            console.log(err);
        }
    });
};




module.exports =  {
    addShoes, getShoes,deleteShoes,updateShoes,getShoesById
}
