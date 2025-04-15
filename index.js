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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Root test
app.get('/', (req, res) => {
  res.send('ViralVibe API is live!');
});

// Test endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello, World!" });
});

// AI response endpoint
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ result: response.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    res.status(500).json({ error: "Something went wrong with OpenAI." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
