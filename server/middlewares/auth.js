const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=async (req,res,next)=>{
    try{
        const token=req.cookies.auth;

        if(!token)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Please login"
                }
            );
        }
    
        const decode=await jwt .verify(token,process.env.JWT_SECRET);
    
        req.user=decode;
        // console.log("req.user==>",req.user);
        next();  
    }catch(e)
    {
        return res.status(400).json(  
            {
                success:false,
                message:"AN error occured while authrntication",
                Error:e.message
            }
        )
    }
}


//is student

exports.isStudent=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='Student')
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"This is a protected route for students"
                    }
                )
            }
            next();
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured in the protected route of student"
            }
        )
    }
}

//isinstructor

exports.isInstructor=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='Instructor')
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"This is a protected route for instructor"
                    }
                )
            }
            next();
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured in the protected route of instructor"
            }
        )
    }
}

//is admin
exports.isAdmin=async (req,res,next)=>{
    try{
        if(req.user.accountType!=='admin')
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:"This is a protected route for admin"
                    }
                )
            }
            next();
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured in the protected route of admin"
            }
        )
    }
}