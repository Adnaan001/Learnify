const exp=require('express');
const { auth, isInstructor, isStudent, isAdmin } = require('../middlewares/auth');
const { createCourse, getAllCourses, getCourseDetails, updateCourse, getInstructorCourses, deleteCourse, getEnrolledCourses } = require('../controllers/course');
const { createSection, deleteSection, updateSection } = require('../controllers/section');
const { createSubSection, updateSubsection, deleteSubsection } = require('../controllers/subsection');
const { ratingAndReview, getAvgRating } = require('../controllers/ratingAndReview');
const { showAllCategories, getCategoryDetails } = require('../controllers/category');
const { setCourseProgress, getCourseProgress } = require('../controllers/courseProgress');
const route=exp.Router();

route.post('/createCourse',auth,isInstructor,createCourse);
route.put('/updateCourse',auth,isInstructor,updateCourse);
route.delete('/deleteCourse',auth,isInstructor,deleteCourse);
route.post('/createSection',auth,isInstructor,createSection);
route.post('/createSubSection',auth,isInstructor,createSubSection);
route.put('/updateSubSection',auth,isInstructor,updateSubsection);
route.delete('/deleteSubSection',auth,isInstructor,deleteSubsection);
route.delete('/deleteSection',auth,isInstructor,deleteSection);
route.put('/updateSection',auth,isInstructor,updateSection);
route.post('/rateCourse',auth,isStudent,ratingAndReview);
route.post('/getAvgRating',getAvgRating);
route.get('/getAllCourses',getAllCourses);
route.post('/getCourseDetails',getCourseDetails);
route.get('/showAllCategories',showAllCategories);
route.get('/getInstructorCourses',auth,isInstructor,getInstructorCourses);

route.get('/getEnrolledCourses',auth,isStudent,getEnrolledCourses)


route.post('/getCategoryDetails',getCategoryDetails);

route.put('/setCourseProgress',auth,isStudent,setCourseProgress);
route.post('/getCourseProgress',auth,isStudent,getCourseProgress);
module.exports=route;