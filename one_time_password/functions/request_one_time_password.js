const admin = require('firebase-admin');
const twilioClient = require('./twilio_client');

module.exports = (req, res) => {
    // verify the user provided a phone number
    if (!req.body.phone){
        return res.status(422).send({ error: 'You must provide a phone number.' })
    }

    // format the phone number by removing all the non-digits characters
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    admin.auth().getUser(phone)
        .then(userModel => {
            const code = Math.floor(Math.random() * 8999 + 1000); // code that's gonna be text to the user
            twilioClient.messages.create({
                body: `Your code is ${code}`,
                to: phone,
                from: '+16465830206'
            }, (err) => {
                if (err) {
                    return res.status(422).send({ error: err })
                }
                admin.database().ref(`users/${phone}`) // create a new collection in our database called 'users'
                    .update({ code: code, codeValid: true })
                    .then(() => res.send({ success: true }))
            })
        })
        .catch(err => {
            res.status(422).send({ error: err })
        });
};