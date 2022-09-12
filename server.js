const express = require('express')
const nodemailer = require('nodemailer')
const bodyparser = require('body-parser')
var cors = require('cors')
require('dotenv').config()


const app = express()

app.use(cors({
    "Access-Control-Allow-Origin": "*"
}))
app.use(bodyparser.json())
app.use(bodyparser.raw())
app.use(bodyparser.urlencoded({ extended: false }))

var transporter = nodemailer.createTransport({
    service: process.env.SMTP_EMAIL,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
});


app.post('/send', (req, res) => {
    const {
        email,
        subject,
        message,
        type,
        name
    } = req.body
     if(!email || !name || !message){
         return res.json({ status: false, message: 'Failed to send email' })
     }else{
         const text =
             `Name : ${name} 
     Email: ${email} 
     Type: ${type}
     Message ${message}
             `
         mailOptions = {
             from: email,
             to: process.env.TO_EMAIL,
             subject,
             text
         };
         transporter.sendMail(mailOptions, function (error, info) {
             console.log(error);
             console.log(info);
             return (error) ?
                 res.json({ status: false, message: 'Failed to send email' })
                 :
                 res.json({ status: true, message: 'Email sent successfully' })
     
         });

     }



})


app.listen(process.env.PORT || 8001, () => {
    console.log('http://localhost:8001');
})



