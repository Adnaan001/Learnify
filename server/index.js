const exp=require('express');
const app=exp();

const cookieParser=require('cookie-parser');

const fileupload=require('express-fileupload');

const cors=require("cors");

app.use(exp.json());

require('dotenv').config();

app.use(cookieParser());

app.use(fileupload(
    {
        useTempFiles:true,
        tempFileDir:'/temp/'
    }
));
  

const PORT=process.env.PORT || 4000;

app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
));

app.use('/api/v1/auth',require('./routes/userRoute'));
app.use('/api/v1/course',require('./routes/courseRoute'));
app.use('/api/v1/admin',require('./routes/adminRoute'));
app.use('/api/v1/profile',require('./routes/profileRoute'));    
app.use('/api/v1/payment',require('./routes/paymentRoute'))

const db=require('./config/database');
db();    

const cc=require('./config/cloudinary');
cc();

app.listen(PORT,()=>{
    console.log(`server started successfully on port :-${PORT}`);
});