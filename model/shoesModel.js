const config = require('../knexfile');
const path = require('path');
const knex = require('knex');
const dbClient = knex(config);

// to add shoes
const addShoes = async function addShoes(shoes, res){
try{
    const data = await dbClient('shoes').insert(shoes);
        res(null, true);
    }
    catch{
        res(null, false);
    }
};

//  to delete shoes by id
const deleteShoes = async function deleteShoes(shoesId, res){
    try{
        const data = await dbClient
        .table('shoes')
        .where('itemId', shoesId)
        .del();
        res(null, true, data);
    }catch(error){
        res(null, false);   
        console.log("error: ", error);
    }
};

// to get shoes list
const getShoes = async function getShoes(res){
    try{
        const data = await dbClient.table('shoes').select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


// to get shoes by id
const getShoeById = async function getShoeById(shoesId, res){
    try{
        const data = await dbClient
        .table('shoes')
        .where('itemId',shoesId)
        .select();
        
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


// to get shoes by name
const getShoesByName = async function getShoesByName(shoesName, res){
    try{
        const data = await dbClient
        .table('shoes')
        .where('shoesName', 'like' ,'%' + shoesName + '%')
        .select('');
        res(null, true, data);        
    }catch{
        res(null, false);
    }
};


// to update shoes
const updateShoes = async function updateShoes(shoesId, shoesName,shoesBrand, shoesPrice,shoesDescription, shoesImageName,shopId, res){
    try{
        const data = await dbClient
        .table('shoes')
        .where('itemId', shoesId)
        .update({
            shoesBrand : shoesBrand,
            shoesName : shoesName,
            shoesPrice: shoesPrice,
            shoesDescription: shoesDescription,
            shoesImageName : shoesImageName,
            shopId: shopId    
        });

        res(null, true, data);
    }catch{
        res(null, false);
    }
};


// 
const uploadImage = async function uploadImage(shoes, res){
    try{
        const data = await dbClient('shoes').insert(shoes);
            res(null, true);
        }
        catch(err) {
            res(null, false);
            console.log("error:", error);
        }
    };
 

module.exports ={
    addShoes,
    getShoes,
    deleteShoes,
    getShoeById,
    getShoesByName,
    updateShoes, 
    uploadImage,
}
    