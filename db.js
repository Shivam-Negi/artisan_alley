const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/artisan_alley';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    db = client.db('artisan_alley');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDB() {
  return db;
}

module.exports = {
  connect,
  getDB,
};
