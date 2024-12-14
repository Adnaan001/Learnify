

exports.paymentSuccessEmail=(studentName,orderId,paymentId,amount)=>{
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful</title>
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
      background-color: #0a1a3e;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
      margin-top: 20px;
      font-size: 16px;
    }
    .details {
      margin: 20px 0;
      background: #f9f9f9;
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 5px;
    }
    .details p {
      margin: 5px 0;
      font-size: 14px;
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
      <img src="https://res.cloudinary.com/dtrcnajee/image/upload/v1729657600/Learnify_oka1ax.png" alt="Learnify Logo">
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Payment Successful!</h2>
      <p>Hello ${studentName},</p>
      <p>Thank you for your payment!</p>
      <div class="details">
        <p><strong>Payment Details:</strong></p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
        <p><strong>Amount Paid: ₹</strong> ${amount}</p>
      </div>
      <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
      <p>Happy Learning!</p>
      <p>The Learnify Team</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2024 Learnify. All rights reserved.</p>
      <p>If you believe this email was sent to you by mistake, please contact us immediately.</p>
    </div>
  </div>
</body>
</html>
`
}