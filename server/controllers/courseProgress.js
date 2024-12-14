const { default: mongoose } = require("mongoose");
const Course = require("../models/course");
const CourseProgress = require("../models/courseprogress");
const Subsection = require("../models/subsection");

exports.setCourseProgress=async (req,res)=>{
    try{
        const {courseId,subSectionId}=req.body;
        const userId=req.user.id;

        const courseChk=await Course.findById(courseId).populate(
            {
                path:"section",
                populate:{
                    path:"subSection"
                }
            }
        );
        var totalLectures=0;
        courseChk.section.forEach((sec)=>{
            console.log("sec==>",sec.subSection.length)
            totalLectures+=sec.subSection.length
        })


        const subSectionChk=await Subsection.findById(subSectionId);

        if(!courseChk || !subSectionChk){
            return res.status(400).json({
                success:false,
                message:"Course or lecture not found"
            })
        }

        const cpChk=await CourseProgress.findOne({
            userId:userId,
            courseId:courseChk._id,
            completedVideos:{$elemMatch:{$eq:subSectionId}}
        })

        if(cpChk)
        {
            return res.status(400).json({
                success:false,
                message:"Lecture already completed"
            })
        }



        const progressRes=await CourseProgress.findOneAndUpdate(
            {
                userId:userId,
                courseId:courseChk._id
            },
            {$push:{completedVideos:subSectionChk._id}},
            {new:true}
        ).populate("completedVideos");

        await Course.findByIdAndUpdate(courseId,{
            progressPercentage:progressPercentage(totalLectures,progressRes.completedVideos.length)
        })
        // console.log(progressPercentage(totalLectures,progressRes.completedVideos.length));

        if(!progressRes)
        {
            return res.status(400).json({
                success:false,
                message:"You are not enrolled in this course"
            })
        }    

        return res.status(200).json({
            success:true,
            message:"Congo for completing this lecture",
            progressRes:progressRes
        })
    }catch(e){
        return res.status(400).json({
            success:false,
            message:"An error ocuured while adding lecture in completed list",
            ERROR:e.message
        })
    }   
}

function progressPercentage(totalLectures,completedLectures){
    return Math.floor((completedLectures/totalLectures)*100);
}


exports.getCourseProgress=async (req,res)=>{
    try{
        // /console.log("in getCourseProgress api.......")
        const {courseId}=req.body;
        const userId=req.user.id;

        // console.log("courseId==>",courseId)

        const courseChk=await Course.findById(courseId);

        // console.log("courseChk._id==>",courseChk._id)

        if(!courseChk)
        {
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }

        // console.log("userId==>",userId)

        const cpChk=await CourseProgress.findOne({
            userId:userId,
            courseId:courseChk._id
        });

        // console.log("cpChk==>",cpChk)


        if(cpChk){
            return res.status(200).json({
                success:true,
                message:"Successfully fetched courseProgress",
                progressRes:cpChk
            })
        }

        return res.status(400).json({
            success:false,
            message:"Course Progress details not found"
        })

    }catch(e){
        console.error("An error occured while fetching course progress details, ERROR==>",e.message);

        return res.status(400).json({
            success:false,
            message:"An error occured while fetching course progress details",
            ERROR:e.message
        })
    }
}