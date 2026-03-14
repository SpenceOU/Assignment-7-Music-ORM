const { sequelize, Track } = require('./setup');

const sampleTracks = [
  {
    songTitle: 'Blinding Lights',
    artistName: 'The Weeknd',
    albumName: 'After Hours',
    genre: 'Pop',
    duration: 200,
    releaseYear: 2019
  },
  {
    songTitle: 'SICKO MODE',
    artistName: 'Travis Scott',
    albumName: 'ASTROWORLD',
    genre: 'Hip-Hop',
    duration: 312,
    releaseYear: 2018
  },
  {
    songTitle: 'Shape of You',
    artistName: 'Ed Sheeran',
    albumName: 'Divide',
    genre: 'Pop',
    duration: 233,
    releaseYear: 2017
  },
  {
    songTitle: 'HUMBLE.',
    artistName: 'Kendrick Lamar',
    albumName: 'DAMN.',
    genre: 'Rap',
    duration: 177,
    releaseYear: 2017
  }
];

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await Track.bulkCreate(sampleTracks);
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();