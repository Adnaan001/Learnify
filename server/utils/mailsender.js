const mail=require('nodemailer');

require('dotenv').config();

const mailsender=async (toemail,subject,body,fromemail)=>{
    const transporter=mail.createTransport(
        {
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        }
    )

    const info=await transporter.sendMail(
        {
            from:fromemail ? fromemail :"Learnify",
            to:toemail,
            subject:subject,
            html:body
        }
    )  

    return info;
}



module.exports=mailsender;