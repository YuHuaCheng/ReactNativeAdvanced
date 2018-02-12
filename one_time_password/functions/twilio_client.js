const twilio = require('twilio');

const accountSid = 'ACe49728cc2a5eab331de67a1202c9b47f';
const authToken = 'c09cdf428e816de02f6f2725a0c0db49';

module.exports = new twilio.Twilio(accountSid, authToken);