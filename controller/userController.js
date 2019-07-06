const model = require('../model/userModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key';

const register = (req, res)=>{
    const userDetails = req.body;
    model.register(userDetails,async function(err, result,dataResult){
        if(!result){
            res.json({
                status:'exists',
                message: "User already exists",
                error: err,
            });
        }else if(result){
                if(dataResult){
                    res.json({
                        status : 'success',
                        message:'user added',
                        error:err
                    });                    
                }else{
                    res.json({
                        status:result,
                        message:'user not added',
                        error:err
                    });
                }                
        }else{
            console.log(err)
        }
    });
};


const login = (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    model.login(email,password,async function(err, result,matched){
        if(result){
            // user exists
            if(matched){
                // passsword matched
                res.json({
                    status:'success',
                    message: 'password matched',
                    error:err,
                    accessToken: jwt.sign({
                        email:email
                    }, SECRET_KEY),
                    email:email,
                });            
            }else{
                // password not matched
                res.json({
                    status:'fail',
                    message: 'password not matched',
                    error:err
                });
            }
        }else if(!result){
            // user doesnot exists
            res.json({
                status:"fail",
                message:'no user',
                error:err,
            });                             
        }else{
            console.log("Error: " +err);
        }
    });
};




const getUsers = (req, res)=>{

    // const token = req.headers.authorization;
    // console.log("token" + token)
    // console.log(token);
    // if(token==undefined){
    //     notAuthenticated(res);
    //     return;
    // }else if(token.length <5){
    //     notAuthenticated(res);
    //     return;
    // }
    
    const data = model.getUsers(async function(err, result, dataResult){

        if(dataResult.length == 0){
            res.json({
                status:'fail',
                message: 'data not retreived'
            });
        }else if(dataResult.length > 0){
            res.json({
                status:'success',
                dataResult:dataResult
            }
        );
            
        }else{
            console.log(err);
        }
    });
};


const getUserById = (req, res)=>{

    // const token = req.headers.authorization;
    // console.log(token);
    // if(token==undefined){
    //     notAuthenticated(res);
    //     return;
    // }else if(token.length <5){
    //     notAuthenticated(res);
    //     return;
    // }

    
    const userId = req.params.userId;
    const data = model.getUserById(userId, async function(err, result, dataResult){
        console.log(dataResult.length);
        // console.log(typeof(dataResult.length));
        
        if(dataResult.length == 0){       
            res.json({
                status:'fail',
                message: 'data not retreived'
            });
        }else if(dataResult.length > 0){
            res.json({
                status:'success',
                dataResult: dataResult
            });
            
        }else{
            console.log(err);
        }
    });
};



const getUserByEmail = (req, res)=>{

    // const token = req.headers.authorization;
    // console.log(token);
    // if(token==undefined){
    //     notAuthenticated(res);
    //     return;
    // }else if(token.length <5){
    //     notAuthenticated(res);
    //     return;
    // }

    
    console.log("type" + typeof(email));
    const emailAddress = req.params.email;
    console.log("this is email", emailAddress);
    const data = model.getUserByEmail(emailAddress, async function(err, result, dataResult){
        if(!result){
            res.json({
                status:'fail',
                message: 'data not retreived'
            });
        }else if(result){

            res.json(dataResult);
            console.log(dataResult);
            
        }else{
            console.log(err);
        }
    });
};



// to update user

const updateUser = (req, res)=>{
    // const token = req.headers.authorization;
    // console.log(token);
    // if(token==undefined){
    //     notAuthenticated(res);
    //     return;
    // }else if(token.length <5){
    //     notAuthenticated(res);
    //     return;
    // }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const contact = req.body.contact;
    const password = req.body.password;
    const userType = req.body.userType;
    const profileImage = req.body.shoesImageName;

    const userId = req.params.userId;

    console.log("update user", firstName);
    
    const data = model.updateUser(userId, firstName, lastName,email,contact, password, userType,profileImage, async function(err, result,dataResult){
        if(!result){
            res.json({
                result:result,
                status: 'fail',
                message: 'data not updated'
            });
        }else if(result){
            res.json({
                result: result,
                status:'success',
                message:'data update',
                dataResult:dataResult

            });
        }else{
            console.log(err);
        }
    });
};


// to deleteuser
const deleteUser = (req, res)=>{
    
    // const token = req.headers.authorization;
    // console.log(token);
    // if(token==undefined){
    //     notAuthenticated(res);
    //     return;
    // }else if(token.length <5){
    //     notAuthenticated(res);
    //     return;
    // }

    const userId = req.params.userId;
    const data =model.deleteUser(userId, async function(err, result){
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






async function notAuthenticated(req) {
    req.json({
      status: 'fail',
      message: 'Not Authenticated',
      code: 404
    });
  }


module.exports =  {
    register,login,getUsers,getUserById,updateUser,deleteUser,getUserByEmail
}