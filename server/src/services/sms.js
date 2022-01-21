require('dotenv').config();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messageSID = process.env.TWILIO_MESSAGE_SID;
const accountSid = 'AC6bfd91d3888044033f2392eb5ebdce74';
const client = require('twilio')(accountSid, authToken);

module.exports = {
  sendSms: async (phoneNumber, messageBody) => {
    console.log(`[SMS] ${phoneNumber}: ${messageBody}`);
    const response = await client.messages
      .create({
        to: phoneNumber,
        body: messageBody,
        messagingServiceSid: messageSID,
      })
    return response;
    // .then(message => console.log(message.sid))
    // .done();
  }
}