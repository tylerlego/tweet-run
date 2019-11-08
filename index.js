const express = require('express');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});