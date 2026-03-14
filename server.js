const express = require('express');
const { sequelize, Track } = require('./database/setup');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json(track);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch track' });
  }
});

app.post('/api/tracks', async (req, res) => {
  try {
    const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;

    if (!songTitle || !artistName || !albumName || !genre) {
      return res.status(400).json({
        error: 'songTitle, artistName, albumName, and genre are required'
      });
    }

    const newTrack = await Track.create({
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear
    });

    res.status(201).json(newTrack);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create track' });
  }
});

app.put('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);

    if (!track) {
      return res.status(404).json({ error: 'Track not found' });
    }

    const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;

    await track.update({
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear
    });

    res.json(track);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update track' });
  }
});

app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const deletedCount = await Track.destroy({
      where: { trackId: req.params.id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json({ message: 'Track deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete track' });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
});