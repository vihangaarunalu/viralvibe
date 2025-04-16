// app.js
require('dotenv').config(); // For environment variables
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Basic Routes
app.get('/', (req, res) => {
  res.send('ViralVibe AI Server is Running 🚀');
});

// Health Check Endpoint (Required for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server Configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
