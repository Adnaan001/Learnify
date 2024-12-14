const { contactSubmission } = require("../utils/contactSubmission");
const mailsender = require("../utils/mailsender");
require("dotenv").config();


exports.contactUs=async (req,res)=>{

    try{
        const {firstName,lastName,email,callingcode,phone,message}=req.body;
        const response=await mailsender(process.env.MAIL_USER,`New Message from ${firstName} ${lastName}`,message,email);
        // console.log(response);
        const userResponse=await mailsender(email,`Contact Form Submission Confirmation`,contactSubmission(firstName,lastName,email,callingcode,phone,message))

        return res.status(200).json(
            {
                success:true,
                message:"Message Sent Succesfully.",
                Response:response
            }
        )  
    }catch(e)
    {
        return res.status(400).json(
            {
                success:false,
                message:"An error occured while send mail",
                Error:e.message
            }
        )
    }

}