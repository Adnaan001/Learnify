exports.contactSubmission=(firstName,lastName,email,callingCode,phone,message)=>{
    return`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f7;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-image: linear-gradient(to right, #5de0e6, #004aad);
            color: #ffffff;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .header img {
            max-width: 10rem; 
            margin-bottom: 10px; 
        }
        .content {
            padding: 30px;
        }
        .content h2 {
            font-size: 22px;
            color: #333;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            color: #ffffff;
            background-image: linear-gradient(to right, #5de0e6, #004aad);
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .footer {
            background-color: #f4f4f7;
            color: #777;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #4a90e2;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="https://res.cloudinary.com/dtrcnajee/image/upload/v1729657600/Learnify_oka1ax.png" alt="Learnify Logo" />
            <div>Thank You for Contacting Us!</div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>
                Thank you for reaching out to us at Learnify. We have received your message and will get back to you shortly.
            </p>
            <p>
                Here’s a summary of the information you provided:
            </p>
            <ul>
                <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> +${callingCode} ${phone}</li>
                <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>
                If you need immediate assistance, please feel free to reply to this email or contact our support team.
            </p>
            <a href="http://localhost:3000" class="button">Visit Our Website</a>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2023 Learnify. All rights reserved.</p>
            <p><a href="https://learnify.com/unsubscribe">Unsubscribe</a> | <a href="https://learnify.com/privacy-policy">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`
}