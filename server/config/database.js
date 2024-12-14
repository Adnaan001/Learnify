const mongoose=require('mongoose');

require('dotenv').config();


const dbConnect=async ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log('DB connected succesfully'))
    .catch((e)=>console.error('Error while connecting with DB',e.message));
}
    

module.exports=dbConnect;  