const exp=require('express');
const { auth, isInstructor } = require('../middlewares/auth');
const { updateProfile, updateProfilePhoto, changePassword, deleteAccount, InstructorStats } = require('../controllers/profile');
const route=exp.Router();


route.put('/updateProfile',auth,updateProfile);   
route.put('/updateProfilePhoto',auth,updateProfilePhoto);   
route.put('/changePassword',auth,changePassword);  
route.delete('/deleteAccount',auth,deleteAccount);   

route.get('/instructorStats',auth,isInstructor,InstructorStats);

module.exports=route;