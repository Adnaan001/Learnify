const Course=require('../models/course');
const User = require('../models/user');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary');
const Category= require('../models/category');
const Section = require('../models/section');
const Subsection = require('../models/subsection');
const courseprogress = require('../models/courseprogress');


exports.createCourse=async (req,res)=>{
    try{
        console.log("Course creating..")
        const {title,description,price,category,tags,benefits,requirements}=req.body;
        const imgFile=req.files.imgFile;
        const userId=req.user.id;
        // console.log("req.body==>",req.body);
        // console.log('req.files==>',req.files);
    
        if(!title || !description|| !price || !category || !imgFile || !benefits || !tags || !requirements)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Fill the required fields"
                }
            )
        }

        const instructorDetails=await User.findById(req.user.id);

        if(!instructorDetails)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Instructor with this email does not exists, please login or signup"
                }
            )
        }

        //uploading thumbnail image to cloudinary 
        const thumbnail=await uploadToCloudinary(imgFile,process.env.FOLDER);
        // console.log("thumbnail==>",thumbnail);

        //checking while the category with provided name exists or not 
        const categoryRes=await Category.findOne({name:category});
        if(!categoryRes)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:`There is no such category with name ${category}`
                }
            )
        }
        // console.log('categoryRes==>',categoryRes);

        //Finally now creating course entry in DB with all the details provided
        const createdCourse=await Course.create(
            {
                title:title,
                description:description,
                price:price,
                category:categoryRes._id,
                status:"Drafted",  
                tags:tags,
                benefits:benefits, 
                requirements:requirements,
                progressPercentage:0,
                thumbnail:thumbnail.secure_url,
                instructor:req.user.id
            })

        const courseRes = await Course.findById(createdCourse._id).populate("category").populate("section");

        //Entering this course entry in category DB array
        const updateCategoryRes=await Category.findByIdAndUpdate(categoryRes._id,{$push:{courses:courseRes._id}},{new:true}).populate('courses').exec();
        console.log("updatedCategoryRes==>",updateCategoryRes);


        //First finding the Instructor up and Entering this course in the corresponding instructors DB courses array

        try{
            const instructorRes=await User.findByIdAndUpdate(instructorDetails._id,{$push:{courses:courseRes._id}},{new:true}).populate('courses').exec();

            return res.status(200).json(
                {
                    success:true,
                    message:"Course created succesfully",
                    instructorResponse:instructorRes,
                    categoryResponse:updateCategoryRes,
                    coursesResponse:courseRes
                }
            )
        }catch(e)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:'An error occured while updating instructor details',
                    Error:e.message
                }
            )
        }

    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while creating course",
                Error:e.message
            }
        )
    }
}

exports.updateCourse=async(req,res)=>{
    try{
        console.log("update course is called");
        const {courseId,title,description,price,category,tags,benefits,requirements,status}=req.body;
        const imgFile=req.files?.imgFile;
        const userId=req.user.id;
        console.log("category==>",category);

        const instructorDetails=await User.findById(req.user.id);
    
        if(!instructorDetails)
        {  
            return res.status(400).json(
                {
                    success:false,
                    message:"Instructor with this email doesn't exists, please login or signup"
                }    
            )
        }   

        const coursechk=await Course.findById(courseId).populate("category");
        console.log("coursechk==>",coursechk);
        if(!coursechk)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Course does not exists"
                }
            )
        }

        let categoryUpdate=false;
        console.log("coursechk.category.name==>",coursechk.category.name);
        if(coursechk.category.name!==category)
            categoryUpdate=true;

        //for the case if category is not changed 

        //uploading thumbnail image to cloudinary 
        // const thumbnail=await uploadToCloudinary(imgFile,process.env.FOLDER);
        // console.log("thumbnail==>",thumbnail);

        // Upload new thumbnail if imgFile is present, otherwise keep the existing thumbnail
        let thumbnailUrl = coursechk.thumbnail;
        if (imgFile) {
            console.log("thumbnail changes");
            const thumbnail = await uploadToCloudinary(imgFile, process.env.FOLDER);
            thumbnailUrl = thumbnail.secure_url;
        }

        //checking while the category with provided name exists or not 
        // console.log("checking category");
        let categoryID=coursechk.category;
        if(category)   
        {
            const categoryRes=await Category.findOne({name:category});
            
            categoryID=categoryRes._id;
        }
            
        
        // console.log("categoryRES==>",categoryID)
        if(!categoryID)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:`There is no such category with name ${category}`
                }
            )  
        }

        console.log("updateing course");

        const courseRes=await Course.findByIdAndUpdate(courseId,{
            title:title,
            description:description,
            price:price,
            category:categoryID,
            status:status,
            tags:tags,
            benefits:benefits,
            requirements:requirements,  
            thumbnail:thumbnailUrl,
        },{new:true}).populate({
            path:'section',
            populate:{
                path:'subSection'
            }
        }).populate("category");

        console.log("course updated");
        //Entering this course entry in category DB array if and only if CATEGORY CHANGES
        if(categoryUpdate)
        {
            await Category.findByIdAndUpdate(categoryID,{$push:{courses:courseRes._id}})
            await Category.findByIdAndUpdate(coursechk.category._id,{$pull:{courses:courseRes._id}})
        }

            return res.status(200).json(
                {
                    success:true,
                    message:status ? `Course ${status}`:"Course updated succesfully",
                    coursesResponse:courseRes
                }
            )
    }catch(e){

        return res.status(400).json({
                success:false,
                message:"An error occured while updating the course",
                Error:e.message
        })

    }
}

exports.deleteCourse=async (req,res)=>{
    try{
        const {courseId}=req.body;
        console.log("courseId in deleteCourse==>",courseId)
        
        const courseRes=await Course.findByIdAndDelete(courseId).populate("category");

        const sections=courseRes.section;

        for(const sectionId of sections)
        {
            const section=await Section.findByIdAndDelete(sectionId);

            if(section)
            {
                const subSection=await Subsection.deleteMany({_id:{ $in:section.subSection }})
            }
        }
    
        const instructorRes=await User.findByIdAndUpdate(req.user.id,{$pull:{courses:courseId}},{new:true});

        const categoryRes=await Category.findByIdAndUpdate(courseRes.category._id,{$pull:{courses:courseId}});

        return res.status(200).json({
            success:true,
            message:"Course deleted successfully",
            courseRes:courseRes,
            instructorRes:instructorRes,
            categoryRes:categoryRes
        })
    }catch(e){

    }
}

exports.getAllCourses=async (req,res)=>{
    try{
        const Response=await Course.find({});

        return res.status(200).json(
            {
                success:true,
                message:"All courses fetched successfully",
                Response:Response
            }
        )
    }catch(e)
    {   
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while retrieving all courses from DB",
                Error:e.message
            }
        )
    }
}

exports.getInstructorCourses=async (req,res)=>{
    try{
        // console.log("getInstructorCourses called...");

        const InstructorRes=await User.findById(req.user.id).populate({
            path:"courses",
            populate:[
                {
                    path:"section",
                    populate:{
                        path:"subSection"
                    }
                },
                {
                    path:"category"
                }
            ]
        });

        return res.status(200).json(
            {
                success:true,
                message:"User Details fetched sucessfully",
                courses:InstructorRes.courses
            }  
        )
    
    }catch(e){
        return res.status(400).json(
            {
                success:false,
                message:"AN error occured while fetching instructor Courses",
                ERROR:e.message
            }
        )
    }

}

exports.getEnrolledCourses=async (req,res)=>{
    try{
        const StudentRes=await User.findById(req.user.id).populate({
            path:"courses",
            populate:[
                {
                    path:"section",
                    populate:{
                        path:"subSection"
                    }
                },
                {
                    path:"category"
                }
            ]
        });

        return res.status(200).json(
            {
                success:true,
                message:"User Details fetched sucessfully",
                courses:StudentRes.courses
            }  
        )

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"An error occured while fetching enrolled courses",
            ERROR:e.message
        })
    }
}

exports.getCourseDetails=async (req,res)=>{
    try{
        
        const {courseId}=req.body;

        const Response=await Course.findById(courseId)
                                    .populate('category')
                                    .populate(
                                        {
                                            path:'section',
                                            populate:{
                                                path:'subSection'
                                            }
                                        }
                                    )
                                    .populate('ratingAndReview')
                                    .populate(
                                        {
                                            path:'instructor',
                                            populate:{
                                                path:'personalDetails'
                                            }
                                        }
                                    );
        if(!Response)
        {
            return res.status(400).json({
                success:false,
                message:"Course not found"
            })
        }

        return res.status(200).json(
            {
                success:true,
                message:"Course details fetched successfully",
                Response:Response
            }
        )
    }catch(e)
    {
        console.log("ERROR==>",e.message)
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while fetching the course details",
                Error:e.message
            }
        )
    }
}  