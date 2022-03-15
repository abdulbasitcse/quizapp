
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config()


const sms = (req, res, next) => {

const email = req.body.email

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    "body": `Hi ! You have successfully Registered with email: ${email} `,
    "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
    "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
    "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
    "direction": "outbound-api",
    "from": "+19062562468",
    "to": "+919716316160"
    })
  .then(message => 
    console.log(message.body))
    //res.status(200).send("Message Successfully sent")
.catch((error) => {
    console.error(error)
    return res.status(401).send("Some error")
  });
  
}

module.exports = sms