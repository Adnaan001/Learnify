const exp=require('express');
const { isAdmin, auth } = require('../middlewares/auth');
const category = require('../models/category');
const {createCategory} = require('../controllers/category');
const { contactUs } = require('../controllers/contactUs');
const { getAllReviews } = require('../controllers/ratingAndReview');
const route=exp.Router();

route.post('/createcategory',auth,isAdmin,createCategory);
route.post('/contactus',contactUs);

route.get('/getAllReviews',getAllReviews);
module.exports=route
