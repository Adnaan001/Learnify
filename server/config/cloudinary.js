const cloudinary=require('cloudinary').v2;

require('dotenv').config();

const cloudinaryConnect=()=>{
    try{
        cloudinary.config(
            {
                cloud_name:process.env.CLOUD_NAME,
                api_key:process.env.API_KEY,
                api_secret:process.env.API_SECRET
            }
        )
        console.log('Connected with cloudinary succesfully');
    }catch(e)
    {
        console.error('Error while connecto=ing with cluodinary',e.message);
    }
}

module.exports=cloudinaryConnect;