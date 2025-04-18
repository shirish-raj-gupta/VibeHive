// utils/api.js

// Function to fetch events from the database
export async function getEventsFromDB() {
  const eventsRef = firebase.firestore().collection('events');
  const snapshot = await eventsRef.get();
  return snapshot.docs.map(doc => doc.data());
}

// Function to fetch user details by userId
export async function getUserFromDB(userId) {
  const userRef = firebase.firestore().collection('users').doc(userId);
  const userDoc = await userRef.get();
  return userDoc.exists ? userDoc.data() : {};
}
