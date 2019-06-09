const path = require('path');
const knex = require('knex');

module.exports={
    client: 'mysql',
    connection:{
        host: 'localhost',
        user: "root",
        database : 'android_api',
        password: ''
    },
    version: '5.2',
    migrations:{
        tableName:'migrations',
        directory: path.resolve(__dirname,'./migrations')        
    },
    useNullAsDefault: true
};function _authenticate(token) { //token -> 123123789127389213
  if (!token) {
    return false;
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return true;
    // use payload if required
  } catch(error) {
    return false
  }
}
