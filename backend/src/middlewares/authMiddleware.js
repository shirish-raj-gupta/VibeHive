const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access Denied: No Token' });

  try {
    const verified = jwt.verify(token, JWT_SECRET); // Replace with your actual secret
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
