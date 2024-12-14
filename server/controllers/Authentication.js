const User=require('../models/user');
const cloudinary=require('cloudinary').v2;
const Otp=require('../models/otp');
const bcrypt=require('bcrypt');
const { response } = require('express');
const Profile=require('../models/profile');
const {uploadToCloudinary}=require('../utils/uploadToCloudinary');
const jwt=require('jsonwebtoken');
require('dotenv').config();


const otpGenerator=require('otp-generator');
const user = require('../models/user');

exports.otp=async (req,res)=>{
    try{
        const {email}=req.body;   

        const chk=await User.findOne({email});
        if(chk)
        {
            return res.status(200).json(
                {
                    success:false,
                    message:"User already exists"
                }
            )
        }
  
        const randomOtp=otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,   
            specialChars:false
        });
       
        const response=await Otp.create(
            {
                email,
                otp:randomOtp
            }
        )
        return res.status(200).json(
            {
                success:true,
                message:'OTP Sent Successfully',
                response:response
            }
        )
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:'Got some Error while generating otp',
                Error:e.message
            }
        )
    }
}


exports.signup=async (req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:'Please fill the required fields'
                }
            )  
        }
        
        if(password!== confirmPassword)
        {
            return res.status(400).json(
                {
                    success:"false",
                    message:'Password does not match'
                }  
            )
        }

        const userdetail=await User.findOne({email});

        if(userdetail)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:'User already exists'
                }
            )
        }
        console.log('otp in server==>',otp);
        if(!otp)
        {
            return res.status(200).json(
                {
                    message:"otp required"
                }
            )
        }
        const DB_otp=await Otp.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log('DB_OTP==>',DB_otp);
        console.log('DB_otp==>',DB_otp.otp);
        if(!DB_otp)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:'Otp expired'
                }
            )
        }
        
        if(otp != DB_otp.otp)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:'Wrong otp'
                }
            )
        }

        try{
            //hasing password
            const hashedPassword=await bcrypt.hash(password,10);



            //saving image to cludinary
            // const cloudRes=await uploadToCloudinary(imageFile,process.env.FOLDER)


            //saving default profile details
            const profile=await Profile.create(
                {
                    gender:null,
                    dob:null,
                    about:null,
                    callingCode:null,
                    phone:null
                }
            )

            //creating user data in DB
            const userResponse=await User.create(
                {
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword,
                    accountType:accountType,
                    personalDetails:profile._id,
                    image:`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
                }
            );


            //Returning Response
            return res.status(200).json(
                {
                    success:true,
                    message:'user Entry created succesfully',
                    response:userResponse
                }
            )
        }catch(e)
        {
            console.error('Error while saving data in User DB ==>',e.message)
            return res.status(400).json(
                {
                    success:false,
                    message:'Error while saving data in User DB',
                    Error:e.message
                }
            )
        }

    }catch(e)
    {
        console.error('Got some Error while signup ==>',e.message);

        return res.status(400).json(
            {
                success:false,
                message:'Got some Error while signup',
                Error:e.message
            }
        )
    }

}

exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password)
        {
            return res.status(400).json(
                {
                    succes:false,
                    message:"Please enter the details"
                }
            )
        }

        let user=await User.findOne({email}).populate('personalDetails');

        if(!user)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"User does not exist. Please sign up to create an account."
                }
            )
        }
        // const ans=await bcrypt.compare(password,user.password)
        // console.log(ans);
        if(!(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Password do not match.Please try again"
                }
            )
        }

        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }

        try{

            console.log(process.env.JWT_SECRET);
            const token=await jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
            });

            user=user.toObject();
            user.token=token;
            user.password='';

            return res.cookie('auth',token,{
                expires:new Date(Date.now() +3*24*60*60*1000),
                httpOnly:true,
                secure: true, // Ensure this is true in production
                sameSite: 'None', // This must be set for cross-origin requests
            }).status(200).json(
                {
                    success:true,
                    message:"User loggedin succesfully",
                    user:user,
                    token:token
                }
            )

        }catch(e)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"An error occured while creating token",
                    Error:e.message
                }
            )
        }


    }catch(e)
    {
        console.error("An error occurred during login. ERROR==>",e.message);
        return res.status(400).json(
            {
                success:false,
                message:'An error occured while login',
                ERROR:e.message
            }
        )
    }
}