const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registerRoute = require('./routes/registerEvent');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes); // Use the user routes for handling user-related requests
app.use('/api', eventRoutes);
app.use('/api', registerRoute);

module.exports = app;
