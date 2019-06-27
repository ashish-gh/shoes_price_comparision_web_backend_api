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

module.exports ={
    addShoes
}
    