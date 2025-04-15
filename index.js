const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Home route for root path
app.get('/', (req, res) => {
  res.send("🎉 ViralVibe API is live! Use POST /generate to interact.");
});

// Simple test route
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello, World!" });
});

// Main route for generating AI responses
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.choices[0].message.content;
    res.json({ result });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "Something went wrong with OpenAI." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
