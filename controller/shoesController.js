
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



module.exports =  {addShoes}
