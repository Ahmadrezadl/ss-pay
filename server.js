const express = require('express');
const axios = require('axios');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/verify-purchase', require('./routes/verifyPurchase'));

const PORT = process.env.PORT || 3000;


console.log("Routes Loaded");
console.log(app._router.stack.map(r => r.route && r.route.path));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
