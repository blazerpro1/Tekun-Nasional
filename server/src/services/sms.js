require('dotenv').config();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messageSID = process.env.TWILIO_MESSAGE_SID;
const accountSid = 'AC6bfd91d3888044033f2392eb5ebdce74';
const client = require('twilio')(accountSid, authToken);



module.exports = {
  message: async () => {
    client.messages
      .create({
        body: '',
        messagingServiceSid: messageSID,
        to: '+60127426388'
      })
      .then(message => console.log(message.sid))
      .done();
  }
}