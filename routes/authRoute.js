
const express=require('express');
const authController= require('../controllers/auth')

// route to add to database
const router =express.Router();


router.post('/signup',authController.signup);
router.get('/login',authController.login)

module.exports=router;