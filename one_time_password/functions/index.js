const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service_account');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://onetimepassword-6922c.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);

