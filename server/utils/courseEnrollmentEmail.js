

exports.courseEnrollmentEmail=(studentName,courseName)=>{
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Enrollment Confirmation</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-image: linear-gradient(to right, #5de0e6, #004aad);
      text-align: center;
      padding: 20px;
    }
    .header img {
      max-width: 150px;
      margin-bottom: 10px;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .content h2 {
      color: #0a1a3e;
      font-size: 20px;
      margin-top: 0;
    }
    .button {
      display: inline-block;
      background-image: linear-gradient(to right, #5de0e6, #004aad);
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
      margin-top: 20px;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #777777;
      padding: 10px 20px;
      background-color: #f7f7f7;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <img src="https://res.cloudinary.com/dtrcnajee/image/upload/v1729657600/Learnify_oka1ax.png"  alt="Learnify Logo">
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Hello ${studentName},</h2>
      <p>Congratulations! You have successfully enrolled in the course:</p>
      <p style="color: #004aad; font-size:larger;"><strong>${courseName}</strong></p>
      <p>This course is designed to provide you with all the tools and knowledge needed to excel in this field. We’re excited to have you on board!</p>
      <!-- <p>To get started, click the button below:</p>
      <a href="[Course URL]" class="button">Start Learning</a> -->
      <p>If you have any questions or need support, feel free to contact us.</p>
      <p>Happy Learning!</p>
      <p>The Learnify Team</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2024 Learnify. All rights reserved.</p>
      <p>If you didn’t enroll in this course, please disregard this email.</p>
    </div>
  </div>
</body>
</html>
`
}