const mongoose=require('mongoose');


const userSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            require:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        confirmPassword:{
            type:String,
        },
        accountType:{   
            type:String,
            enum:['Student','Instructor','admin']
        },
        personalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Profile'
        },
        courses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'
            }
        ],
        courseProgress:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'CourseProgress'
        },
        image:{
            type:String
        },
        token:{
            type:String
        },
        tokenExpires:{
            type:Date
        }

    }
)


module.exports=mongoose.model('User',userSchema);