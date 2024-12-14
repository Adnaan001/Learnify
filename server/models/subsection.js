const mongoose=require('mongoose');

const subSectionSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        video:{
            type:String,
            required:true
        },
        duration:{
            type:Number
        }
    }
)


module.exports=mongoose.model('SubSection',subSectionSchema);