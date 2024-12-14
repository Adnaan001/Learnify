const mongoose=require('mongoose');
const mailsender=require('../utils/mailsender');
const { response } = require('express');
const { otpMailTemplate } = require('../utils/otpMailTemplate');

const otpSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        otp:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now(),
            expires:'5m'
        }
    }
)


otpSchema.pre('save',async function(){
    try{
        const response=await mailsender(this.email,'Your OTP for Learnify Account Verification',otpMailTemplate(this.otp));
    }catch(e){
        console.error('Error while sending email from pre hook ==>',e.message);
    }   
});



module.exports=mongoose.model('Otp',otpSchema);