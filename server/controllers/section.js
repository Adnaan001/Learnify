const Section = require("../models/section");
const Course=require('../models/course');
const Subsection = require("../models/subsection");




exports.createSection= async (req,res)=>{
    try{
        // console.log("create section backend API running...");
        const {sectionName,courseId}=req.body;

        if(!sectionName)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill the required field"
                }
            )
        }

        const course=await Course.findById(courseId);

        if(!course)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Course does not exists"
                }
            )
        }

        const response=await Section.create(
            {
                sectionName
            }
        );

        const courseRes=await Course.findByIdAndUpdate(courseId,{$push:{section:response._id}},{new:true}).populate("category").populate({
            path:"section",
            populate:{
                path:"subSection"
            }
        })

        return res.status(200).json(
            {
                success:true,
                message:'Section created successfully',
                response:response,
                courseResponse:courseRes
            }
        )
    }catch(e)
    {

        return res.status(400).json(
            {
                success:false,
                message:"An error occured while creating section",
                Error:e.message
            }
        )
    }
}

exports.updateSection=async (req,res)=>{
    try{
        const {sectionId,sectionName,courseId}=req.body;

        const Res=await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});

        const courseRes=await Course.findById(courseId).populate("category").populate({
            path:"section",
            populate:{
                path:"subSection"
            }
        });

        return res.status(200).json(
            {
                success:true,
                message:"SectionName updated successfully",
                Response:Res,
                courseResponse:courseRes
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured during section updation",
                Error:e.message
            }
        )
    }
}

exports.deleteSection=async (req,res)=>{
    try{
        const {sectionId,courseId}=req.body;

        const sectionRes=await Section.findByIdAndDelete(sectionId);
    
        const subSectionArray=sectionRes.subSection;

        for(i in subSectionArray)
        {
            await Subsection.findByIdAndDelete(subSectionArray[i]);
        }

        const courseRes=await Course.findByIdAndUpdate(courseId,{$pull:{section:sectionRes._id}},{new:true}).populate("category").populate({
            path:"section",
            populate:{
                path:"subSection"
            }
        });

        return res.status(200).json(
            {
                success:true,
                message:"Section with all of its lectures deleted successfully",
                courseResponse:courseRes
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured during section deletion",
                Error:e.message
            }
        )
    }
}