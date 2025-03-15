const express = require('express');
const axios = require('axios');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/verify-purchase', require('./routes/verifyPurchase'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
