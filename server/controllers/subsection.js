// const Course = require("../models/course");
const Subsection = require("../models/subsection");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
const Section=require('../models/section');
const Course=require('../models/course');
const SubSection = require("../models/subsection");
require('dotenv').config();


exports.createSubSection=async (req,res)=>{
    try{
        console.log("creating SubSection....");
        const {title,description,duration,sectionId,courseId}=req.body;
        console.log("req.files==>",req.files);
        const vidFile=req.files.vidFile;
        console.log("duration==>",duration);

        if(!title || !description || !vidFile || !sectionId)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"All fileds are required"
                }
            )
        }

        const sec=await Section.findById(sectionId);

        // console.log('section Id',sectionId);
        // console.log(sec);

        if(!sec)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Section with this ID does not exists"
                }
            )
        }

        const cloudinaryRes=await uploadToCloudinary(vidFile,process.env.FOLDER);
        // console.log(cloudinaryRes);

        const response=await Subsection.create(
            {
                title,
                description,
                video:cloudinaryRes.secure_url,
                duration:duration
            }
        );

        try{
            const sectionRes=await Section.findByIdAndUpdate(
                sectionId,{$push:{subSection:response._id}},{new:true}
            ).populate('subSection').exec();

            const courseRes=await Course.findByIdAndUpdate(courseId,{
                $inc:{totalDuration:duration}
            },{new:true}).populate("category").populate(
                {
                    path:'section',
                    populate:{
                        path:'subSection'
                    }
                }
            )
        
            return res.status(200).json(
                {
                    success:true,
                    message:"Entry created successfully",
                    subsectionRes:response,
                    sectionRes:sectionRes,
                    courseResponse:courseRes
                }
            )
        }catch(e)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"An error occured while updating subSection on section",
                    Error:e.message
                }
            )
        }
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured during subsection creation",
                Error:e.message,
            }
        )
    }

}

exports.updateSubsection=async (req,res)=>{
    try{
        // console.log("update subsection called");
        const {title,description,duration,courseId,sectionId,subSectionId}=req.body;
        const vidFile=req.files?.vidFile;

        // console.log("vidFile==>",req.files?.vidFile);
        // // console.log("req.files==>",req.files); 

        const sec=await Section.findById(sectionId);

        // console.log('section Id',sectionId);
        // console.log(sec);

        if(!sec)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Section with this ID does not exists"
                }
            )
        }

        const subSectionchk=await SubSection.findById(subSectionId);
        // console.log("coursechk==>",subSectionchk);
        if(!subSectionchk)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"subSection does not exists"
                }
            )
        }

        let videoUrl = subSectionchk.video;
        if (vidFile) {
            // console.log("video changes");
            const video = await uploadToCloudinary(vidFile, process.env.FOLDER);
            videoUrl = video.secure_url;
        }

        console.log("duration==>",duration)
        const oldDuration=subSectionchk.duration;
        const newDuration=duration;
        const durationDifference=newDuration-oldDuration;

        const response=await Subsection.findByIdAndUpdate(subSectionId,
            {
                title,
                description,
                duration:newDuration,
                video:videoUrl,
            }
        );

            // const sectionRes=await Section.findById(sectionId,{new:true}).populate('subSection').exec();

            const courseRes=await Course.findByIdAndUpdate(courseId,{
                $inc:{totalDuration:durationDifference}
            },{new:true}).populate("category").populate(
                {
                    path:'section',
                    populate:{
                        path:'subSection'
                    }
                }
            )
        
            return res.status(200).json(
                {
                    success:true,
                    message:"Entry created successfully",
                    subsectionRes:response,
                    // sectionRes:sectionRes,
                    courseResponse:courseRes
                }
            )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured during subsection updation",
                Error:e.message,
            }
        )
    }
}

exports.deleteSubsection=async (req,res)=>{
    try{
        const {subSectionId,sectionId,courseId}=req.body;

        const sectionRes=await Section.findByIdAndUpdate(sectionId,{$pull:{subSection:subSectionId}},{new:true});

        const subsectionRes=await Subsection.findByIdAndDelete(subSectionId);

        // console.log("subSectionRes==>",subsectionRes)

        if (!subsectionRes || typeof(subsectionRes.duration) !== "number") {
            throw new Error(`Invalid duration for subsection: ${subsectionRes?.duration}`);
        }
   
        const courseRes=await Course.findByIdAndUpdate(courseId,{
            $inc:{totalDuration:-subsectionRes.duration}
        },{new:true}).populate("category").populate({
            path:"section",
            populate:{
                path:"subSection"
            }
        })

        return res.status(200).json(
            {
                success:true,
                message:"Subsection deleted successfully",
                sectionRes:sectionRes,
                subsectionRes:subsectionRes,
                courseResponse:courseRes
            }
        )
    }catch(e)
    {
        console.error("ERROR==>",e.message)
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while deleting subSection from DB",
                Error:e.message
            }
        )
    }
}