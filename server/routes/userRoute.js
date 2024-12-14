const exp=require('express');
const route=exp.Router();

const { otp, signup, login } = require('../controllers/Authentication');
const { auth } = require('../middlewares/auth');
const { resetPasswordToken, resetPassword } = require('../controllers/resetPassword');




route.post('/otp',otp);
route.post('/signup',signup);
route.post('/login',login);
route.post('/resetPasswordToken',resetPasswordToken);
route.post('/resetPassword',resetPassword);

  

   
module.exports=route;