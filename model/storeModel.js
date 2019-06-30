const config = require('../knexfile');
const path = require('path');
const knex = require('knex');
const dbClient = knex(config);

const addStore = async function addStore(store, res){
try{
    const data = await dbClient('store').insert(shoes);
        res(null, true);
    }
    catch(err) {
        res(null, false);
        console.log("error:", error);
    }
};

const deleteStore = async function deleteStore(storeId, res){
    try{
        await dbClient
        .table('store')
        .where('storeId', storeId)
        .del();
        res(null, true);
    }catch(error){
        res(null, false);   
        console.log("error: ", error);
    }
};

const getStore = async function getStore(res){
    try{
        const data = await dbClient.table('store').select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


const getStoreById = async function getStoreById(storeId, res){
    try{
        const data = await dbClient
        .table('store')
        .where('storeId', storeId)
        .select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};



const updateStore = async function updateStore(storeId, storeName,latitude, longitude, res){
    try{
        const data = await dbClient
        .table('store')
        .where('storeId', storeId)
        .update({
            storeName : storeName,
            latitude : latitude,
            longitude: longitude
        });
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


module.exports ={
    addStore, 
    getStore, 
    deleteStore, 
    getStoreById,
    updateStore
}
    