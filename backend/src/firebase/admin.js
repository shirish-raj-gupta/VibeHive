const admin = require('firebase-admin');
const serviceAccount = require('./firebase-adminsdk.json');

// Initialize Firebase Admin SDK only if it's not already initialized
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://vibehive-2fce4-default-rtdb.firebaseio.com/', // Ensure this is correct
  });


// Now you can use Firebase Firestore or Realtime Database
const db = admin.firestore();

// Export the admin and db references to use them elsewhere in your application
module.exports = { admin, db };
