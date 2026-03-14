const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_NAME || 'music_library.db',
  logging: false
});

const Track = sequelize.define('Track', {
  trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  albumName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER
  },
  releaseYear: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
});

async function setupDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ force: true });
    console.log('Database and tables created successfully.');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  setupDatabase();
}

module.exports = { sequelize, Track };