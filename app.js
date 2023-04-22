const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const hostname = '127.0.0.1';
const port = 3000;


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'index.html');
  // res.sendFile(htmlFilePath);
  res.render('index');
});

app.get('/about', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'about.html');
  // res.sendFile(htmlFilePath);
  res.render('about');
});

app.get('/recommend', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  // res.sendFile(htmlFilePath);
  res.render('recommend');
});

// important
app.post('/recommend', function(req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
  next();
});

app.get('/confirm', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  // res.sendFile(htmlFilePath);
  res.render('confirm');
});

app.get('/restaurants', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  // res.sendFile(htmlFilePath);
  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  res.render('restaurants', {NumberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants});
});

app.get('/restaurants/:id', function(req, res) {
  const restaurantId = req.params.id;

  const filePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(filePath); 
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
   if (restaurant.id === restaurantId) {
    return res.render('restaurants-detail', {restaurant: restaurant})
   }
  }

  res.render('404');
  
});

app.listen(port, hostname, () => {
  console.log(`Server is running http://${hostname}:${port}/`)
});