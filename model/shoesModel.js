const config = require('../knexfile');
const path = require('path');
const knex = require('knex');
const dbClient = knex(config);

const addShoes = async function addShoes(shoes, res){
try{
    const data = await dbClient('shoes').insert(shoes);
        res(null, true);
    }
    catch(err) {
        res(null, false);
        console.log("error:", error);
    }
};


const getShoes = async function getShoes(res){
    try{
        const data = await dbClient.table('shoes').select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};

const deleteShoes = async function deleteShoes(shoesId, res){
    try{
        await dbClient
        .table('shoes')
        .where('itemId', shoesId)
        .del();
        res(null, true);
    }catch(error){
        res(null, false);   
        console.log("error: ", error);
    }
};


module.exports ={
    addShoes,getShoes, deleteShoes
}
    