const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// MongoDB Model
const TeamSchema = new mongoose.Schema({
  name: String,
  score: Number,
  gamesPlayed: Number,
  rank: Number,
  avatarUrl: String,
  badges: [String]
});
const Team = mongoose.model('Team', TeamSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/leaderboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// API to get leaderboard data
app.get('/api/leaderboard', async (req, res) => {
  try {
    const teams = await Team.find().sort({ rank: 1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
