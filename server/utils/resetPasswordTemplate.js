exports.reserPasswordTemplate=(name,link)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <link rel="stylesheet" href="otp.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
        
        * {
            margin: 0px;
            padding: 0px;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .container {
            width: 100%;
            max-width: 600px;
        }

        img {
            width: 10rem;
            margin-bottom: 2rem;
        }
        #resetbtn{
            text-decoration: none;
            color: white;
        }
        button:hover{
            transform: scale(0.95);
        }
        @media (max-width: 600px) {
            body{
                align-items: flex-start;
                justify-content:start;
            }
            #para1{
                margin-bottom: 20px;
            }
            #para2{
                margin-top: 20px;
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://res.cloudinary.com/dtrcnajee/image/upload/v1729657600/Learnify_oka1ax.png" alt="Learnify Logo">
        <h1>Hey ${name},</h1>
        <p style="margin-bottom: 30px;" id="para1">Forgotten your password? Don't worry, resetting it couldn't be easier. Just click the link below.</p>
        <button
            style="
                    padding: 10px;
                    border-radius: 10px;
                    background-image: linear-gradient(#5de0e6,#004aad);
                    border: none;
                    max-width: 150px;
                    align-self: center;
                    "
        >
            <a href=${link} id="resetbtn">Reset Password</a>
        </button>
        <p style="margin-top: 30px; margin-bottom: 15px;" id="para2">For security purposes, this link will expire in 5 minutes or after you reset your password. If you haven't forgotten your password, please, ignore this message.</p>
        <p style="margin-bottom: 15px;">
            With very best wishes,<br>Learnify
        </p>
        <a href=${link}>${link}</a>

        <p style="margin-top: 15px;">If clicking the link does not work, please copy and paste the URL into your browser instead.</p>
    </div>
</body>
</html>`
}