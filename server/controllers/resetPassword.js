const mailsender = require("../utils/mailsender");
const { reserPasswordTemplate } = require("../utils/resetPasswordTemplate");
const User=require('../models/user');
const bcrypt=require('bcrypt');
const { response } = require("express");

exports.resetPasswordToken=async (req,res)=>{

    try{
        const email=req.body.email;

        const token=crypto.randomUUID();
        const chk=await User.findOne({email});
   
        if(!chk)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"There is no such user with this email address"
                }
            )
        }

        const user=await User.findOneAndUpdate({email},{
            token:token,
            tokenExpires:Date.now()+5*60*1000
        });

        const link=`http://localhost:3000/resetpassword/${token}`
        const mailRes=mailsender(email,'Forgot your password?',reserPasswordTemplate(user.firstName,link));

        return res.status(200).json(
            {
                success:true,
                message:"A link has been sent to your email"
            }  
        )

    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:'An error occured while generating token for reset password',
                Error:e.message
            }
        )       
    }
}

exports.resetPassword=async (req,res)=>{
    try{    

        const {token,password,confirmPassword}=req.body;

        const user=await User.findOne({token});

        if(!user)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Token is Invalid"
                }
            )
        }

        if(password !== confirmPassword)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Password do not match"
                }
            )
        }

        if(user.tokenExpires<Date.now())
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"The reset password link has expired. Please request a new link and try again."
                }
            )
        }
        
        const hashedPassword=await  bcrypt.hash(password,10);

        const updatedRes=await User.findOneAndUpdate({token},{
            password:hashedPassword
        },{new:true})

        return res.status(200).json(
            {
                success:true,
                message:"Password updated successfully",
                response:updatedRes
            }
        )

    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured during reset password",
                Error:e.message
            }
        )
    }
}