const User=require('../models/user');
const Profile=require('../models/profile');
const { uploadToCloudinary } = require('../utils/uploadToCloudinary');
const bcrypt=require('bcrypt');
const profile = require('../models/profile');
const Course = require('../models/course');

exports.updateProfile=async (req,res)=>{
    try{
        const {firstName,lastName,gender,dob,callingCode,phone,about}=req.body;
        if(!gender || !dob || !callingCode || !phone )
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill the required fields"
                }
            )
        }
    
        const user=req.user.id;
        const userDetails=await User.findById(user);

        if(!userDetails)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"User doesn't exists"
                }
            )
        }
    
        const profile=userDetails.personalDetails;

        // const profileDetails=await Profile.findById(profile);
        await Profile.findByIdAndUpdate(profile,
            {
                gender,
                dob,
                callingCode:callingCode,
                phone,
                about
            },{new:true});

        const upadtedRes=await User.findByIdAndUpdate(user,{
            firstName:firstName,
            lastName:lastName,
        },{new:true}).populate("personalDetails");

        return res.status(200).json(
            {
                success:true,
                message:"Profile updated successfully",
                updatedRes:upadtedRes
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured during profile updation",
                Error:e.message
            }
        )
    }

}

exports.updateProfilePhoto=async (req,res)=>{
    try{
        const imgFile=req.files.imgFile;

        const userId=req.user.id;
        if(!userId)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"UserId not found"
                }
            )
        }
        const cloudinaryRes=await uploadToCloudinary(imgFile,process.env.FOLDER);
    
        const updatedRes=await User.findByIdAndUpdate(userId,
            {
                image:cloudinaryRes.secure_url
            },{new:true}
        ).populate('personalDetails');
    
        return res.status(200).json(
            {
                success:true,
                message:"Profile photo uploaded successfully",
                updatedRes:updatedRes
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while updating profile photo",
                Error:e.message
            }
        )
    }
}

exports.changePassword=async (req,res)=>{
    try{
        const {currentPassword,newPassword}=req.body;

        if(!currentPassword || !newPassword)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill the required fields"
                }
            )
        }
    
        const userId=req.user.id;
        const userDetails=await User.findById(userId);
        if(await bcrypt.compare(currentPassword,userDetails.password))
        {
            const hashedPassword=await bcrypt.hash(newPassword,10);
    
            const updatedRes=await User.findByIdAndUpdate(userId,{password:hashedPassword},{new:true});
    
            return res.status(200).json(
                {
                    success:true,
                    message:"Password changed successfully",
                    updatedRes:updatedRes
                }
            )
        }
        else{
            return res.status(400).json(
                {
                    success:false,
                    message:"Please enter the correct current password"
                }
            )
        }
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while changing password",
                Error:e.message
            }
        )
    }
}


exports.InstructorStats=async (req,res)=>{
    try{
        const userId=req.user.id;

        const courses=await Course.find({instructor:userId});

        // console.log("courses==>",courses);

        const courseData=courses.map((course)=>{
            return {
                courseId:course._id,
                courseName:course.title,
                courseDescription:course.description,
                totalStudents:course.studentsEnrolled.length,
                totalIncome:course.studentsEnrolled.length*course.price
            }
        })

        return res.status(200).json({
            courseData:courseData
        })

    }catch(e){
        console.error("ERROR==>",e.message);
        return res.status(400).json({
            success:false,
            message:"An error occured while fetching instructor stats",
            ERROR:e.message
        })
    }
}

exports.deleteAccount=async (req,res)=>{
    try{
        const userId=req.user.id;
        userDetails=await User.findByIdAndDelete(userId);
        if(!userDetails)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"User does not exists"
                }
            )
        }
        const profileRes=await Profile.findByIdAndDelete(userDetails.personalDetails);
    
        return res.status(200).json(
            {
                success:true,
                message:"Account deleted successfully",
                userRes:userDetails,
                profile:profileRes
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while deleting account",
                Error:e.message
            }
        )
    }
}
