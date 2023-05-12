const { connect, getDB } = require('./db');

async function insertProducts() {
  try {
    await connect(); // Call the connect function to establish the database connection
    const db = getDB();
    const products = [
      {
        name: 'Jordan',
        price: 800,
        image: 'images_project/jordan.jpg',
      },
      {
        name: 'Art',
        price: 550,
        image: 'images_project/art.jpg',
      },
      {
        name: 'Messi',
        price: 5000,
        image: 'images_project/messi.jpg',
      },
      {
        name: 'sneaker art',
        price: 6900,
        image: 'images_project/sneak.jpg',
      },
      {
        name: 'scenery',
        price: 50000,
        image: 'images_project/oilpaint.jpg',
      },
      {
        name: 'landscape',
        price: 300,
        image: 'images_project/paint.jpg',
      },
      // Add more products here
    ];

    const result = await db.collection('products').insertMany(products);
    console.log(`${result.insertedCount} products inserted`);
  } catch (error) {
    console.error('Error inserting products:', error);
  } finally {
    process.exit(0);
  }
}

insertProducts();
