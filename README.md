How-I-Made-a-Serverless-Contact-Form-with-AWS
I built a serverless contact form on AWS using API Gateway, Lambda, and SES. The frontend form submits data to an API Gateway endpoint, which triggers a Lambda function to send me an email (and optionally store the message in DynamoDB). The whole setup is scalable, cost-efficient, and requires no traditional server.
Got it 💡 You want a **full project presentation write-up** that you can use online (portfolio, LinkedIn, GitHub, or blog).
I’ll put **all 7 steps together** in a clean, professional style.

---

🚀 Serverless Contact Form with AWS

📌 Project Overview

I built a **Serverless Contact Form** using AWS services. The form allows users to submit their name, email, and message through a simple HTML frontend. The backend is fully serverless, using **API Gateway, Lambda, and Amazon SES** to process and send form submissions directly to my inbox, while optionally storing them in DynamoDB.

This solution is **scalable, cost-efficient, and requires no traditional servers**.

---

🔹 1. Frontend (HTML + CSS + JS)

I created a responsive HTML form styled with CSS. When a user submits, JavaScript captures the input and sends it as a `POST` request to an API Gateway endpoint.

```html
<form id="contactForm">
  <input type="text" name="name" placeholder="Your Name" required />
  <input type="email" name="email" placeholder="Your Email" required />
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send</button>
</form>

<script>
  document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    await fetch("https://your-api-gateway-url/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    alert("Message sent!");
  });
</script>
```

✅ Hosted on **Amazon S3 + CloudFront** for global access.

---

🔹 2. API Gateway

* Created an **HTTP API** in API Gateway.
* Added a **POST `/submit` route**.
* Integrated the route with my Lambda function.
* Enabled **CORS** so the frontend can communicate securely.

---

🔹 3. AWS Lambda Function

The Lambda function parses the form input and sends an email using Amazon SES.

```js
const AWS = require("aws-sdk");
const ses = new AWS.SES();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const params = {
      Destination: { ToAddresses: ["myemail@example.com"] },
      Message: {
        Body: { Text: { Data: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}` } },
        Subject: { Data: "New Contact Form Submission" },
      },
      Source: "no-reply@yourdomain.com", // verified in SES
    };

    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send" }) };
  }
};
```

---

🔹 4. Amazon SES (Simple Email Service)

* Verified my **domain/email** in SES.
* Configured it so Lambda can send emails directly to my inbox.
* Requested **production access** to send to unverified addresses.

---

 🔹 5. DynamoDB (Optional Storage)

I also set up a **DynamoDB table** (`ContactFormMessages`) to log submissions:

```js
const dynamo = new AWS.DynamoDB.DocumentClient();
await dynamo.put({
  TableName: "ContactFormMessages",
  Item: { id: Date.now().toString(), ...body }
}).promise();
```

This ensures I don’t lose messages even if an email fails.

---

🔹 6. Security

* Enabled **CORS** in API Gateway.
* Added **IAM permissions** so only my Lambda can call SES/DynamoDB.
* Can extend with **reCAPTCHA** for spam protection.

---

🔹 7. Deployment

* **Frontend**: Hosted static HTML/CSS/JS in **Amazon S3 + CloudFront**.
* **Backend**: API Gateway + Lambda + SES (and DynamoDB).

---

 ✅ Final Result

* Users fill out the form.
* API Gateway sends the request to Lambda.
* Lambda uses SES to email me the submission.
* Messages are optionally stored in DynamoDB.
* Entire solution runs **serverless** with minimal cost.

---

 📸 Architecture Diagram

**\[User] → (HTML Form in S3/CloudFront) → API Gateway → Lambda → SES (Email) + DynamoDB (Storage)**

---

 💡 Why This Project?

* **Scalable** → Handles any number of submissions.
* **Cost-efficient** → Pay only for usage (Lambda, SES, API Gateway).
* **No servers** → Fully managed by AWS.
* **Practical use case** → Can be deployed for websites, portfolios, and apps.



Would you like me to design a **visual architecture diagram** (nice graphic) that you can include in your online presentation?
