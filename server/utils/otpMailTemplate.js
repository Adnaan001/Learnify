


exports.otpMailTemplate=(otp)=>{
    return`<!DOCTYPE html>
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
            text-align: center;
        }

        img {
            width: 10rem;
            margin-bottom: 2rem;
        }

        h1 {
            margin-bottom: 2rem;
        }

        #otp {
            font-weight: bolder;
            font-size: 5rem;
            margin-bottom: 1rem;
        }

        @media (max-width: 600px) {
            #otp {
                font-size: 2rem;
            }
            body{
                align-items: flex-start;
                justify-content:start;
            }
            h1{
                margin-bottom: 1rem;
            }
            p{
                margin-bottom: 0.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://res.cloudinary.com/dtrcnajee/image/upload/v1729657600/Learnify_oka1ax.png" alt="Learnify Logo">
        <h1>Let's sign you up</h1>
        <p>Use this code to sign up to Learnify.</p>
        <p>OTP expires in 5 minutes</p>
        <p id="otp">${otp}</p>
    </div>
</body>
</html>`
}