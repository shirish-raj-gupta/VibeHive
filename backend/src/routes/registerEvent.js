const express = require('express');
const { db } = require('../firebase/admin');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this path is correct
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Ensure this matches the frontend URL request
router.post('/registerEvent', authMiddleware, async (req, res) => {
  try {
    const { eventId, attendees, confirmation } = req.body;
    const { userId, name, email } = req.user;

    // Validate input
    if (!eventId || !attendees || !confirmation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate attendees count
    if (attendees < 1 || attendees > 6) {
      return res.status(400).json({ error: 'Attendees must be between 1 and 6' });
    }

    // Validate confirmation value
    if (!['yes', 'no', 'maybe'].includes(confirmation)) {
      return res.status(400).json({ error: 'Invalid confirmation value' });
    }

    const ticketId = uuidv4().slice(0, 8).toUpperCase();

    const participant = {
      userId,
      name,
      email,
      eventId,
      ticketId,
      attendees,
      confirmation,
      timestamp: new Date(),
    };

    // Add participant to Firestore
    await db.collection('participants').add(participant);

    res.status(200).json({ message: 'Registration successful', ticketId });
  } catch (err) {
    console.error('Error registering:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
