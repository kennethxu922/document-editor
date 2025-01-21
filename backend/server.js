// backend/server.js
const express = require('express');
const cors = require('cors');
const { pool } = require('./db/connection'); // Fix the import
const apiRouter = require('./routes/api');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
pool.connect((err, client, release) => { // Use callback with client
  if (err) {
    console.error('⚠️ Database connection error:', err.message);
  } else {
    console.log('✅ Connected to PostgreSQL');
    release(); // Release the client back to the pool
  }
});

// Routes
app.use('/api', apiRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});