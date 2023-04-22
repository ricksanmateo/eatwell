const path = require('path');

const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;


const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

app.use(function(req, res) {
  res.status(404).render('404');
})

app.use(function(error, req, res, next) {
  res.status(500).render('500');
})

app.listen(port, hostname, () => {
  console.log(`Server is running http://${hostname}:${port}/`)
});