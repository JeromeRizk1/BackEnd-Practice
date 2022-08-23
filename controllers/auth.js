const user=require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator/check');

const secret = process.env.SECRET;

// create account in database
const signup=async(req,res,next)=>{
//    const email =req.body.email;
//    const password=req.body.password;
// console.log(req.body.email)
const errors = validationResult(req);
if (!errors.isEmpty()) {
  const error = new Error('Validation failed.');
  error.statusCode = 422;
  error.data = errors.array();
  throw error;
}
const {email,password}=req.body;

    user.findOne({email: email}).then(user =>{
      console.log(user);
      if(user){
        const error = new Error('A user with this email already exists.');
        throw error;
      }
    })
   // new object
   const hPass = bcrypt.hash(password, 12);
   const users =new user({
    email: email,
    password: hPass
   })
   
 await users.save()
  res.send('Sign Up Completed! :)').catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
}
const login=(req,res,next)=>{
      const {email,password}=req.body;

      // check email is in database
      user.findOne({email:email}).then(user=>{
        if(!user){
          res.send('the user is not here')
        }
        
        // access token
        const token = jwt.sign(
          {
            email: user.email,
            password:user.password
          },
          secret,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token: token });
      }).catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

}

module.exports={signup,login}