const express = require('express');
const uuid = require('uuid');
const resData = require('../util/restaurant-data.js');

const router = express.Router();

router.get('/recommend', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
  // res.sendFile(htmlFilePath);
  res.render('recommend');
});

// important
router.post('/recommend', function(req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  
  const restaurants = resData.getStoredRestaurant();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants)

  res.redirect("/confirm");
});

router.get('/confirm', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
  // res.sendFile(htmlFilePath);
  res.render('confirm');
});

router.get('/restaurants', function(req, res) {
  // const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  // res.sendFile(htmlFilePath);
  
  const restaurants = resData.getStoredRestaurant()
  restaurants.sort(function(resA, resB) {
    if (resA > resB) {
      return 1;
    }
    return -1;
  })

  res.render('restaurants', {NumberOfRestaurants: restaurants.length, restaurants: restaurants});
});

router.get('/restaurants/:id', function(req, res) {
  const restaurantId = req.params.id;

  const restaurants = resData.getStoredRestaurant();

  for (const restaurant of restaurants) {
   if (restaurant.id === restaurantId) {
    return res.render('restaurants-detail', {restaurant: restaurant})
   }
  }

  res.render('404');
  
});

module.exports = router;