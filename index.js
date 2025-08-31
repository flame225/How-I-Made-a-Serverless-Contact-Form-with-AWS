exports.handler = async (event) => {
    const body = JSON.parse(event.body);
  
    // Send email using SES
    const AWS = require("aws-sdk");
    const ses = new AWS.SES();
  
    const params = {
      Destination: { ToAddresses: ["myemail@example.com"] },
      Message: {
        Body: { Text: { Data: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}` } },
        Subject: { Data: "New Contact Form Submission" },
      },
      Source: "no-reply@example.com", // Must be verified in SES
    };
  
    await ses.sendEmail(params).promise();
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  };
  