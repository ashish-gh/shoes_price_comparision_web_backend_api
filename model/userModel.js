const config = require('../knexfile');
const path = require('path');
const knex = require('knex');
const dbClient = knex(config);
const bcrypt = require('bcrypt');

// user registration
const register = async function register(user, res, dateResult){
    try{
        const email = user.email;
        const result = await dbClient('users').first('email').where('email',email);
        if(!result){
            // now register
            const password = user.password;
            const hashedPassword = bcrypt.hashSync(password,10);
                  const data = await dbClient.table('users')
                  .insert({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email,
                    contact : user.contact,
                    password : hashedPassword,
                    userType : user.userType,
                    profileImage: user.profileImage
                  });
                  if(data){
                      res(null,true,data); 
                    }
                    else { 
                        res(null,false,data); 
                    }
                }
        else{ 
            res(null,false,result);
         }
    }catch(error){
        res(null,false);
        console.log("Error : " + error);
    }
};


// user login
const login = async function login(email, password, res, dateResult){
    try{
        const emailAdd = email;
        const passwordFromJSON = password;
        // check if user exists or not
        const data = await dbClient('users').first('email').where({email:emailAdd});
        if(data){
        // now confirm password
            const pass =  await dbClient('users').first('password').where({email:emailAdd});
            const password = pass.password;
            const isMatch = bcrypt.compareSync(passwordFromJSON, password);
            if(isMatch){
                console.log("matched");
                res(null,true,true) ;
            }else{
                res(null,false,false);
            }
        }else{
            // user does not exists
            res(null,false,data)
        }
    }
    catch(error){
        res(null,false);
        console.log("Error : is here : " + error);
    }
};


// get list of users
const getUsers = async function getUsers(res){
    try{
        const data = await dbClient.table('users').select('');
        res(null, true, data);
        console.log(data);
        
    }catch{
        res(null, false);
    }
};


const getUserById = async function getUserById(userId, res){
    try{
        const data = await dbClient
        .table('users')
        .where('userId', userId)
        .select('');
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


const getUserByEmail = async function getUserByEmail(email, res){
    try{

        console.log("email here", typeof(email));


        const em = 'ashish.gh123@gmail.com'; 
        // const em = email.toString();
        const data = await dbClient
        .table('users')
        .where('email', em)
        .select('');

        console.log("data", data.length);
        for(var i =0; i < data.length; i++){           
            console.log("usertype", data[i].userType);
        }
    
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


const updateUser = async function updateUser(userId,firstName,lastName, email,contact,password,userType,profileImage, res){
    console.log("updade model", );
    
    try{
        const hashedPassword = bcrypt.hashSync(password,10);

        const data = await dbClient
        .table('users')
        .where('userId', userId)
        .update({
            firstName : firstName,
            lastName : lastName,
            email: email,
            contact: contact,
            password: hashedPassword,
            userType: userType,
            profileImage: profileImage         
        });
        console.log("data", data);
        
        res(null, true, data);
    }catch{
        res(null, false);
    }
};


// to delete shoes

const deleteUser = async function deleteUser(userId, res){
    try{
        await dbClient
        .table('users')
        .where('userId', userId)
        .del();
        res(null, true);
    }catch(error){
        res(null, false);   
        console.log("error: ", error);
    }
};




module.exports = {
    register,
    login,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
}