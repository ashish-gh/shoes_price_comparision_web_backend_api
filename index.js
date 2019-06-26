const Express = require('express');
const express = new Express();

const cors = require('cors');
const bodyParser = require('body-parser');

//connction  factory
const knex = require('knex');
const config = require('./knexfile');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// for uploading image
const path=require('path');
express.use(Express.static(path.join(__dirname, 'public')));

const multer = require('multer'); //to upload the image file
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    // console.log(file.fieldname);
    let ext=path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
});
var upload = multer({storage: storage}).single('imageFile');



//create an express instance /object

express.use(cors());
express.use(bodyParser.json());

// this is client connection
const dbClient= knex(config)
const SECRET_KEY = 'secret_key';


// get version

function getVersion(req, res) {
  // send me a version
  res.json({version: '0.0.0'});           
}


// users
// register user

async function registerUser(request, response) {
    // get username
    const email = request.body.email;
    // get password
    const password = request.body.password;
    const userType=request.body.userType;

    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = await dbClient.table('users').first('email').where('email', email);
    if (!data) {
      dbClient
      .table('users')
      .insert({
        // this must be same for database's column
        email: email,
        password: hashedPassword,
        userType: userType

      })
      .then(data => {
        response.json({
          status: 'success',
          data: {
            email: email,
          }
        })  
      })
      .catch(error => {
        response.json({
          status: 'fail',
          error: error.toString()
        })
      })      
    } else {
      response.json({
        status: 'fail',
        message: 'User already exists'
    })
  }
  }
  

// create a auth handler
async function authenticate(request, response) {
  
  const email = request.body.email;
  const passwordFromJSON = request.body.password;

  const data = await dbClient.table('users').first('password').where('email', email);
  if (!data) {
    response.json({
      status: 'fail',
      message: 'User not found'
    })
  } else {
    const password = data.password;
    const isMatch = bcrypt.compareSync(passwordFromJSON, password);
    if (isMatch) {
      // password matched
      response.json({
        status: 'success',
        accessToken: jwt.sign({
          email: email
        }, SECRET_KEY)
      })
   } else {
     response.json({
       status: 'fail',
       message:'not matched password',
     })
   }
  } 
}



function notAuthenticated(response) {
  response.json({
    status: 'fail',
    message: 'Not Authenticated',
    code: 404
  });
}


function _authenticate(token) { //token -> 123123789127389213
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



async function getUsers(request, response) {
  if (_authenticate(request.headers.authorization) === false) {
    notAuthenticated(response);
    return;
  }

  try {
    const data = await dbClient.table('users').select('email');
    response.json({
      status:'success',
      data: data
    })
  } catch(error) {
    notAuthenticated(response);
    error:error.toString()
    return;
  }

}

async function getUser(request, response) {
  // const isAuthenticated = _authenticate(request.headers.authorization);
  // if (!isAuthenticated) {
  //   notAuthenticated(response);
  //   return;
  // }

  try {
    const data = await dbClient
    .table('users')
    .where({
      email: request.params.email
    })
    .select('email', 'password')
    response.json({
      status:'success',
      data: data
    })
  } catch(error) {
    notAuthenticated(response);
    error:error.toString()
    return;
  }
}





function sendStatus(req, resp){
    resp.json({
        status: 'ok'
    })
}

function getComments(req,resp){
    dbClient
    .select('userId', 'foodId', 'comment','timestamp')
    .table('recipeComments')
    .then(data=>{
        resp.json({
            data : data
        })
    })
}

function addComment(req,resp){
    dbClient('recipeComments')
    .insert({
        id : '1',
        userId: '2',
        foodId: '1',
        comment:'It tastes good.',
        timestamp:'2019-1-12'
    })
    .then(val =>{
        resp.json({
            status: 'success'
        })
    })
    .catch(error => {
        resp.json({
            status: 'fail'
        })
        resp.json({
            status: 'ok'
        })
       
    })
}

// shoes
async function getShoes(request, response) {
  // if (_authenticate(request.headers.authorization) === false) {
  //   notAuthenticated(response);
  //   return;
  // }
  try {
    const data = await dbClient.table('shoes').select();
    response.json({
      status:'success',
      data: data
    })
  } catch(error) {
    notAuthenticated(response);
    error:error.toString();
    return;
  }
}

// add shoes

async function addShoes(request, response) {

  try{
  const shoesBrand = request.body.shoesBrand;
  const shoesName = request.body.shoesName;
  const shoesPrice = request.body.shoesPrice;
  const shoesDescription = request.body.shoesDescription;
  const shoesImageName = request.body.shoesImageName;
  
  const data = await dbClient
  .table('shoes')
  .insert({
    // this must be same for database's column
    shoesBrand: shoesBrand,
    shoesName: shoesName,
    shoesPrice: shoesPrice,
    shoesDescription: shoesDescription,
    shoesImageName: shoesImageName  
  });
  response.json({
    status:'success',
    data: data
  })
  }catch(error){
    // notAuthenticated(response);
    response.json(error);
    error:error.toString();
    return;
  }
  


  


    // .then(data => {
    //   response.json({
    //     status: 'success',
    //     data:data
    //   })  
    // })
    // .catch(error => {
    //   response.json({
    //     status: 'fail',
    //     error: error.toString()
    //   })
    // })
}
// get shoe

async function getShoe(request, response) {
  // const isAuthenticated = _authenticate(request.headers.authorization);
  // if (!isAuthenticated) {
  //   notAuthenticated(response);
  //   return;
  // }
  dbClient
    .table('shoes')
    .where({
     itemId: request.params.shoesId
    })
    .select('')
    .then(data => {
      response.json({
        status: 'success',
        data: data
      })
    })
    .catch(error => {
      response.json({
        status: 'fail',
        error: error.toString()
      })
    })
}

// update shoes


async function updateShoes(request,response){
  
  console.log(request.body);
  const  shoesId = request.params.shoesId;
  const  shoesBrand = request.body.shoesBrand;
  const  shoesName = request.body.shoesName;
  const  shoesPrice = request.body.shoesPrice;
  const  shoesDescription = request.body.shoesDescription;
  const  shoesImageName = request.body.shoesImageName;
  

  dbClient
   .table('shoes')
   .where('itemId',shoesId)
   .update(
     {
       shoesBrand : shoesBrand,
       shoesName : shoesName,
       shoesPrice: shoesPrice,
       shoesDescription: shoesDescription,
       shoesImageName : shoesImageName
     }
      )
   .then(data => {
    response.json({
      status: 'updated successfully',      
    })
  })
  .catch(error =>{
    console.log(error);
    res.json({
      status:'fail',
      // data:null,
      error:error,
      // error:true
    })
  })  
}

// delete shoes

function deleteShoes(request,response){
  console.log(request.body);
  const  shoesId = request.params.shoesId;
  
  dbClient
   .table('shoes')
   .where('itemId',shoesId)
   .del()
   .then(data => {
    response.json({
      status: 'deleted successfully',      
    })
  })
  .catch(error =>{
    console.log(error);
    res.json({
      status:'fail',
      data:null,
      error:true
    })
  })  
  }

  
// store
async function getStores(request, response) {
  // if (_authenticate(request.headers.authorization) === false) {
  //   notAuthenticated(response);
  //   return;
  // }
  try {
    const data = await dbClient.table('store').select();
    response.json({
      status:'success',
      data: data
    })
  } catch(error) {
    notAuthenticated(response);
    error:error.toString()
    return;
  }
}

// add store

function addStore(request, response) {

  const storeName = request.body.storeName;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  
  dbClient
    .table('store')
    .insert({
      // this must be same for database's column
      storeName: storeName,
      latitude: latitude,
      longitude: longitude
      
    })
    .then(data => {
      response.json({
        status: 'success',
        data:data
      })  
    })
    .catch(error => {
      response.json({
        status: 'fail',
        error: error.toString()
      })
    })
}
// get shoe

async function getStore(request, response) {
  // const isAuthenticated = _authenticate(request.headers.authorization);
  // if (!isAuthenticated) {
  //   notAuthenticated(response);
  //   return;
  // }
  dbClient
    .table('store')
    .where({
     storeId: request.params.storeId
    })
    .select('')
    .then(data => {
      response.json({
        status: 'success',
        data: data
      })
    })
    .catch(error => {
      response.json({
        status: 'fail',
        error: error.toString()
      })
    })
}

// update shoes


async function updateStore(request,response){
  
  console.log(request.body);
  const  storeId = request.params.storeId;
  const  storeName = request.body.storeName;
  const  latitude = request.body.latitude;
  const  longitude = request.body.longitude;
  
  dbClient
   .table('store')
   .where('storeId',storeId)
   .update(
     {
       storeName : storeName,
       latitude: latitude,
       longitude :longitude
        }
      )
   .then(data => {
    response.json({
      status: 'updated successfully',      
    })
  })
  .catch(error =>{
    console.log(error);
    res.json({
      status:'fail',
      // data:null,
      error:error,
      // error:true
    })
  })  
}

// delete shoes

function deleteStore(request,response){
  console.log(request.body);
  const  storeId = request.params.storeId;
  
  try{
    dbClient
   .table('store')
   .where('storeId',storeId)
   .del()
   .then(data => {
    response.json({
      status: 'deleted successfully',      
    })
  })
  }catch(error){
    error:error.toString()
    return;
    status:'fail';
  }
  }

// -----------------------------
// review
async function getReviews(request, response) {
  // if (_authenticate(request.headers.authorization) === false) {
  //   notAuthenticated(response);
  //   return;
  // }
  try {
    const data = await dbClient.table('review').select();
    response.json({
      status:'success',
      data: data
    })
  } catch(error) {
    notAuthenticated(response);
    error:error.toString()
    return;
  }
}

// add review

function addReview(request, response) {

  const review = request.body.review;
  const username = request.body.username;
  const shoesId = request.body.shoesId;
  const reviewDate = request.body.reviewDate;
  
  dbClient
    .table('review')
    .insert({
      // this must be same for database's column
      review: review,
      username: username,
      shoesId: shoesId,
      reviewDate : reviewDate,      
    })
    .then(data => {
      response.json({
        status: 'success',
        data:data
      })  
    })
    .catch(error => {
      response.json({
        status: 'fail',
        error: error.toString()
      })
    })
}

// get review
async function getReview(request, response) {
  // const isAuthenticated = _authenticate(request.headers.authorization);
  // if (!isAuthenticated) {
  //   notAuthenticated(response);
  //   return;
  // }

  reviewId = request.params.reviewId
  dbClient
    .table('review')
    .where('reviewId',reviewId)
    .select('')
    .then(data => {
      response.json({
        status: 'success',
        data: data
      })
    })
    .catch(error => {
      response.json({
        status: 'fail',
        error: error.toString()
      })
    })
}

// update review


async function updateReview(request,response){
  
  console.log(request.body);
  const  reviewId = request.params.reviewId;
  const  review = request.body.review;
  const  username = request.body.username;
  const  reviewTime = request.body.reviewTime;
  const  shoesId = request.body.shoesId;
  
  dbClient
   .table('review')
   .where('reviewId',reviewId)
   .update(
     {
       review : review,
       username: username,
       shoesId :shoesId,
       reviewTime: reviewTime
        }
      )
   .then(data => {
    response.json({
      status: 'updated successfully',      
    })
  })
  .catch(error =>{
    console.log(error);
    res.json({
      status:'fail',
      // data:null,
      error:error,
      // error:true
    })
  })  
}

// delete review

function deleteReview(request,response){
  console.log(request.body);
  const  reviewId = request.params.reviewId;
  
  dbClient
   .table('review')
   .where('reviewId',reviewId)
   .del()
   .then(data => {
    response.json({
      status: 'deleted successfully',      
    })
  })
  .catch(error =>{
    console.log(error);
    res.json({
      status:'fail',
      data:null,
      error:true
    })
  })  
  }

  // to upload image
async function uploadimage(req,res){
  upload(req,res,function(err) {
      if(err) {
          return res.end("Error uploading file.");
      }
      res.json(req.file);
  });

}



express.get('/', sendStatus);

// to upload image
express.post('/api/upload', uploadimage);


// user
express.post('/api/register', registerUser);
express.post('/api/auth', authenticate); // 1


// shoes
express.get('/api/shoes', getShoes);
express.get('/api/shoes/:shoesId', getShoe);
express.post('/api/shoes', addShoes);
express.put('/api/shoes/:shoesId', updateShoes)
express.delete('/api/shoes/:shoesId', deleteShoes)

// store
express.get('/api/store', getStores);
express.get('/api/store/:storeId', getStore);
express.post('/api/store', addStore);
express.put('/api/store/:storeId', updateStore)
express.delete('/api/store/:storeId', deleteStore)


// review
express.get('/api/review', getReviews);
express.get('/api/review/:reviewId', getReview);
express.post('/api/review', addReview);
express.put('/api/review/:reviewId', updateReview)
express.delete('/api/review/:reviewId', deleteReview)





// recipeComment
express.get('/api/comment', getComments);
express.post('/api/comment', addComment);



express.listen(8005, 'localhost', ()=> {
    console.log("Server is running at", 8005)
})


