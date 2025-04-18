const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('VibeHive backend is running ✅');
});

module.exports = router;
