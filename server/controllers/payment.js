const { default: mongoose } = require("mongoose");
const {instance}=require("../config/razorpay");
const Course = require("../models/course");
const crypto=require('crypto');
const User = require("../models/user");
const mailsender = require("../utils/mailsender");
const { courseEnrollmentEmail } = require("../utils/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../utils/paymentSuccessEmail");
const CourseProgress = require("../models/courseprogress");



exports.capturePayment=async (req,res)=>{
    try{
        console.log("capture Payment called");
        const {courses}=req.body;
        const userId=req.user.id;

        if(courses.length===0)
        {
            return res.status(400).json({
                success:false,
                message:"Please Provide course Id"
            })
        }

        let totalAmt=0;

        for(const courseId of courses)
        {
            try{
                const course=await Course.findById(courseId);

                if(!course)
                {
                    return res.status(400).json({
                        success:false,
                        message:"Course not found"
                    })
                }
                let uid= new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)){
                    return res.status(400).json({
                        success:false,
                        message:"Student already enrolled in this course"
                    })
                }
    
                totalAmt+=course.price;
            }catch(e){
                return res.status(400).json({
                    success:false,
                    message:"An error occured while validating course",
                    ERROR:e.message
                })
            }
        }

        var options={
            amount:totalAmt*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString()
        }
        try{
            const paymentResponse=await instance.orders.create(options);
            return res.status(200).json({
                success:true,
                message:paymentResponse
            })
        }catch(e){
            return res.status(400).json({
                success:false,
                message:"Error occured while creating order instance",
                ERROR:e.message
            })
        }

    }catch(e){
        console.error(e.message)
        return res.status(400).json({
            success:false,
            message:"AN error occured while capturing payment",
            ERROR:e.message
        })
    }
}



exports.verifyPayment=async (req,res)=>{
    try{
        const razorpay_order_id=req.body?.razorpay_order_id;
        const razorpay_payment_id=req.body?.razorpay_payment_id;
        const razorpay_signature=req.body?.razorpay_signature;
        const courses=req.body?.courses;
        const userId=req.user.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId)
        {
            return res.status(400).json({
                success:false,
                message:"Payment failed"
            })
        }

        const body=razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature=crypto
                                .createHmac("sha256", process.env.RAZORPAY_SECRET)
                                .update(body.toString())
                                .digest("hex");
        
        if(expectedSignature === razorpay_signature)
        {
            enrollStudents(courses,userId,res);

            return res.status(200).json({
                success:true,
                message:"Payment Verified"
            })
        }

        return res.status(400).json({
            success:false,
            message:"Payment Failed"
        });


    }catch(e){
        return res.status(400).json({
            succesS:false,
            message:"An error occured while verifying payment",
            ERROR:e.message
        })
    }
}

const enrollStudents=async (courses,userId,res)=>{
    try{

        if(!courses || !userId)
        {
            return res.status(400).json({
                success:false,
                messsage:"Course or user not found"
            })
        }

        for(const courseId of courses)
        {
            const enrolledCourse=await Course.findByIdAndUpdate(courseId,
                                                                        {
                                                                            $push:{studentsEnrolled:userId},
                                                                            $inc:{sold:1}
                                                                        },{new:true});

            if(!enrolledCourse)
            {
                return res.status(400).json({
                    success:false,
                    message:"Course not found"
                })
            }

            const progressRes=await CourseProgress.create({
                userId:userId,
                courseId:enrolledCourse._id
            })
            
            // console.log("progressRes==>",progressRes);

            const enrolledStudent=await User.findByIdAndUpdate(userId,{$push:{courses:enrolledCourse._id}});

            if(!enrolledStudent)
            {
                return res.status(400).json({
                    success:false,
                    message:"user not found"
                })
            }

            const emailResponse=await mailsender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.title}`,
                courseEnrollmentEmail(enrolledStudent.firstName,enrolledCourse.title)
            )
            // console.log("enrolledStudent.firstName==>",enrolledStudent.firstName)
            // console.log("enrolledCourse.title",enrolledCourse.title);
            // console.log("emailResponse==>",emailResponse.response);
        }

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"An error occured during student enrollment entry in database",
            ERROR:e.message
        })
    }
}

exports.sendPaymentSuccessEmail=async (req,res)=>{

    const {orderId,paymentId,amount}=req.body;
    const userId=req.user.id;

    // console.log("req.body of sendPaym.......",req.body);
    // console.log("userId==>",userId)
    

    if(!orderId || !paymentId || !amount || !userId)
    {
        return res.status(400).json({
            success:false,
            message:"Did not recieved all the fields"
        })
    }

    try{
        const enrolledStudent=await User.findById(userId);

        await mailsender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(enrolledStudent.firstName,orderId,paymentId,amount/100)
        )

    }catch(e){
        return res.status(400).json({
            success:false,
            message:"An error occured while sending payment success email",
            ERROR:e.message
        })
    }

}