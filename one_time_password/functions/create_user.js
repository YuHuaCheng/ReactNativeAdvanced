const admin = require('firebase-admin');

module.exports = (req, res) => {
    // verify the user provided a phone number
    if (!req.body.phone){
        return res.status(422).send({error: 'Bad Input'})
    }

    // format the phone number by removing all the non-digits characters
    const phone = String(req.body.phone).replace(/[^\d]/g, "");

    // create a new user account by using the formatted phone number
    admin.auth().createUser({ uid: phone })
        .then(user => res.send(user))
        .catch(err => res.status(422).send({ error: err }));

    // respond to user's request to inform the account has been created
};