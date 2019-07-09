const config = require('../knexfile');
const path = require('path');
const knex = require('knex');
const dbClient = knex(config);

// to add shop
const addShop = async function addShop(shop, res){
try{
    const data = await dbClient('shop').
    insert({
        shopName : shop.shopName,
        shopLocation : shop.shopLocation,
        shopDescription: shop.shopDescription
    });
        res(null, true, data);
    }
    catch(err) {
        res(null, false);
        console.log("error:", error);
    }
};


// to delete shop
const deleteShop = async function deleteShop(shopId, res){
    try{
        const data = await dbClient
        .table('shop')
        .where('shopId', shopId)
        .del();
        
        res(null, true, data);
    }catch(error){
        res(null, false);   
        console.log("error: ", error);
    }
};

// to get all shops
const getShop = async function getShop(res){
    try{
        const data = await dbClient.table('shop').select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


// to get shop by id
const getShopById = async function getShopById(shopId, res){
    try{
         const data = await dbClient
        .table('shop')
        .where('shopId', shopId)
        .select('');

        res(null, true, data);
    }catch{
        res(null, false);
    }
};


// to update shop
const updateShop = async function updateShop(shopId, shopName,shopLocation, shopDescription, res){
    try{
        const data = await dbClient
        .table('shop')
        .where('shopId', shopId)
        .update({
            shopId : shopId,
            shopName :shopName,
            shopLocation: shopLocation,
            shopDescription: shopDescription
        });
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


module.exports ={
    addShop, 
    getShop, 
    deleteShop, 
    getShopById,
    updateShop,
}
    