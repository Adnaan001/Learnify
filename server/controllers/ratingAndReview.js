
const RR=require('../models/ratingAndReview');
const Course=require('../models/course');
const { default: mongoose } = require('mongoose');

exports.ratingAndReview=async (req,res)=>{
    try{
        const {rating,review,courseId}=req.body;

        const userId=req.user.id;
    
        if(!rating || !review)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill the required fields"
                }
            )
        }

        const courseChk=await Course.findById(courseId);

        if(!courseChk)
        {
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }
    
        const enrolled=await Course.findOne(
                                            {   
                                                _id:courseId,
                                                studentsEnrolled:{$elemMatch:{$eq:userId}}
                                            });
    
    
        if(!enrolled)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Student is not enrolled in this course",
                }
            )
        }
        try{
            const userReviewed=await RR.findOne({user:userId,course:courseId});
    
    
            if(userReviewed)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"User already reviewed"
                    }
                )
            }
        }catch(e)
        {
            return res.status(400).json(
                {
                    message:"Error while finding userReviewed",
                    Error:e.message
                }
            )
        }
    
        try{
            const RRresponse=await RR.create({
                user:userId,
                rating:rating,
                review:review,
                course:courseId
            });
    
            const courseRes=await Course.findByIdAndUpdate(courseId,{$push:{ratingAndReview:RRresponse.id}});

            return res.status(200).json(
                {
                    success:true,
                    message:"Thank you for rating and reviewing the course",
                    response:RRresponse,
                    courseRes:courseRes
                }
            )

        }catch(e)
        {
            return res.status(400).json(
                {
                    message:"Error while creating review DB entry",
                    Error:e.message
                }
            )
        }
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while rating the course",
                Error:e.message
            }
        )
    }
}


exports.getAvgRating=async (req,res)=>{
    try{
        const {courseId}=req.body;


        const courseChk=await Course.findById(courseId);

        if(!courseChk)
        {
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }

        const avgRes=await RR.aggregate(
            [
                {
                    $match:{
                        course:new mongoose.Types.ObjectId(courseId)
                    }
                },
                {
                    $group:{
                        _id:courseId,
                        avgRating:{$avg:"$rating"}
                    }
                }
            ]
        );
        return res.status(200).json(
            {
                success:true,
                message:"Succesfull",
                avgRes:avgRes
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while calculating avg",
                Error:e.message
            }
        )
    }
}

exports.getAllReviews=async (req,res)=>{
    try{
        const allReviews=await RR.find().populate("user").populate("course");

        return res.status(200).json({
            success:true,
            Response:allReviews
        })
    }catch(e){
        console.error("ERROR==>",e.message)

        return res.status(400).json({
            success:false,
            message:"An error occured while fetcing all reviews",
            ERROR:e.message
        })
    }
}
