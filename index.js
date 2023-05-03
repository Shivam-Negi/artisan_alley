/* const knowMoreBtn = document.getElementById("know-more-btn");
  knowMoreBtn.addEventListener("click", function() {
    window.location.href = "./buy_page.html";
  }); */

const express = require('express');
const app = express();

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

app.listen(3000, () => {
    console.log("server running");
})

