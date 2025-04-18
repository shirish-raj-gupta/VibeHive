const express = require('express');
const router = express.Router();
const { db } = require('../firebase/admin');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Add this at the top

require('dotenv').config();

// Email transporter (Use your SMTP or Gmail credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables for sensitive information
    pass: process.env.EMAIL_PASS,
  },
});

// Register Route
router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Check if the email is already registered
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (!userSnapshot.empty) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    // Generate a unique userId and verification token
    const userId = uuidv4();
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data to Firestore (no need to save password in plain text)
    await db.collection('users').doc(userId).set({
      userId,
      name,
      email,
      phone,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      verified: false,
      verificationToken,
    });

    // Generate email verification link
    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}&id=${userId}`;

    // Send email to the user with the verification link
    await transporter.sendMail({
      from: `"Eventify" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your email',
      html: `<p>Hello ${name},</p><p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    res.status(201).json({ success: true, message: 'Registration successful. Check your email to verify.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// In your Express.js route file (server-side)
router.get('/verify-email', async (req, res) => {
  const { token, id } = req.query;

  try {
    // Check if token and id exist in the request
    if (!token || !id) {
      return res.status(400).json({ success: false, message: 'Invalid verification link.' });
    }

    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();

    // Check if the document exists and if the verification token matches
    if (!doc.exists || doc.data().verificationToken !== token) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification link.' });
    }

    // Mark the user as verified and clear the verification token
    await userRef.update({ verified: true, verificationToken: null });

    return res.status(200).json({ success: true, message: 'Email verified! You can now log in.' });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ success: false, message: 'Server error during verification.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const userData = userSnapshot.docs[0].data();
    const userId = userSnapshot.docs[0].id;

    if (!userData.verified) {
      return res.status(403).json({ success: false, message: 'Please verify your email first.' });
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId,
        name: userData.name,
        email: userData.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token, // return token to the client
      user: {
        userId,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

module.exports = router;
