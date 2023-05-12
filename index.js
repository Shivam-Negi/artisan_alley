/* const knowMoreBtn = document.getElementById("know-more-btn");
  knowMoreBtn.addEventListener("click", function() {
    window.location.href = "./buy_page.html";
  }); */


/* const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/buy', (req,res) => {
    res.sendFile(__dirname + '/buy_page.html');
});

app.get('/buy/product', (req, res) => {
  res.sendFile(__dirname + '/bargaining_page.html')
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); */


const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/artisan_alley';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/buy', (req, res) => {
  client.connect((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
      return;
    }

    const db = client.db('artisan_alley');
    const collection = db.collection('products');
    
    collection.find().toArray((err, products) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
        return;
      }

      res.render('buy_page', { products });
    });
  });
});

/* app.get('/buy', (req, res) => {
  res.render('buy_page');
}); */


app.get('/buy/product/:id', (req, res) => {
  console.log('here')
  const productId = req.params.id;

  client.connect((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
      return;
    }

    const db = client.db('artisan_alley');
    const collection = db.collection('products');
    
    collection.findOne({ _id: ObjectId(productId) }, (err, product) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred');
        return;
      }

      collection.find({ category: product.category }).toArray((err, similarItems) => {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred');
          return;
        }

        res.render('bargaining_page', { product, similarItems });
      });
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
