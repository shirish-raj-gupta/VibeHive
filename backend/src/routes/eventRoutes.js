const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const multer = require('multer');
const path = require('path');

// Firebase Firestore initialization
const db = admin.firestore();

// Setup multer to handle image upload if it exists
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Validate image types (optional)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
}); // Optional image upload

router.post('/events', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      date,
      location,
      description,
      price,
      userId, // UID sent from frontend
    } = req.body;

    // Validate input fields
    if (!name || !date || !location || !description || !price || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate price is a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }

    // Get user info from 'users' collection
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = userDoc.data();

    // Generate unique event ID
    const eventId = uuidv4();

    // Optional: handle image if uploaded
    let imageUrl = null;
    if (req.file) {
      // Upload image to Firebase Storage
      const bucket = admin.storage().bucket();
      const fileName = `events/${eventId}/${Date.now()}-${req.file.originalname}`;
      const file = bucket.file(fileName);

      await file.save(req.file.buffer, {
        contentType: req.file.mimetype,
        public: true, // Make it publicly accessible
        metadata: {
          firebaseStorageDownloadTokens: uuidv4(),
        },
      });

      imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${file.metadata.metadata.firebaseStorageDownloadTokens}`;
    }

    // Create event data object
    const eventData = {
      eventId,
      name,
      date,
      location,
      description,
      price: parsedPrice,
      image: imageUrl, // Will be null if no image is uploaded
      createdBy: {
        userId,
        name: userData.name,
        phone: userData.phone,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Save event to Firestore
    await db.collection('events').doc(eventId).set(eventData);

    return res.status(201).json({ message: 'Event created successfully', eventId });
  } catch (error) {
    console.error('Error creating event:', error);
    if (error.message.includes('image')) {
      return res.status(400).json({ message: 'Invalid image file' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/eventslist', async (req, res) => {
  try {
    const snapshot = await db.collection('events').orderBy('createdAt', 'desc').get();
    const events = [];

    snapshot.forEach(doc => {
      events.push(doc.data());
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

module.exports = router;
