const mongoose=require('mongoose');


const profileSchema=new mongoose.Schema(
    {
        gender:{
            type:String,
        },
        dob:{
            type:String,
        },
        callingCode:{
            type:Number
        },
        phone:{
            type:Number
        },
        about:{
            type:String,
            trim:true
        }
    }
)


module.exports=mongoose.model('Profile',profileSchema)