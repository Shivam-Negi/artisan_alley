const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to mongodb
mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb://localhost:27017/artisan_alley',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  bprice: Number,
  image: String,
  desc: String,
});
const products = mongoose.model('product', productSchema);

// seller schema
const sellerSchema = new mongoose.Schema({
  FName: String,
  LName: String,
  email: String,
  password: String,
});
const seller = mongoose.model('seller', sellerSchema);

// Define the routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});

app.get('/buy', async (req, res) => {
  products.find().then((foundProducts) => {
    if (foundProducts) {
      res.render('buy_page', {
        foundProducts: foundProducts,
      });
    } else {
      res.send('not found');
    }
  });
});

app.get('/buy/product/:name', async (req, res) => {
  const name = req.params.name;
  products.findOne({ name }).then((product) => {
    //console.log(name);
    if (product) {
      res.render('bargaining_page', {
        product: product,
      });
    } else {
      res.send('not found');
    }
  });
});

app
  .route('/sellerRegistration')
  .get((req, res) => {
    res.render('sellerRegistration');
  });

  app.post('/sellerRegistration', async (req, res) => {
    const newSeller = new seller({
      Fname: req.body.fName,
      Lname: req.body.lName,
      email: req.body.email,
      password: req.body.password,
    });
  
    try {
      await newSeller.save();
      res.status(200);
      res.redirect('/sellerProducts');
    } catch (err) {
      res.render('error');
    }
  });
  
  app.route('/sellerProducts').get((req, res) => {
    res.render('sellerProduct');
  });
  
  app.post('/sellerProducts', async (req, res) => {
    const newProduct = new products({
      name: req.body.name,
      price: req.body.price,
      bprice: req.body.bprice,
      image: req.body.image,
      desc: req.body.desc,
    });
    try {
      await newProduct.save();
      res.status(200);
      res.redirect('/buy');
    } catch (err) {
      res.send('error');
    }
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
