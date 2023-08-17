const express = require('express');

const router = express.Router();

// router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
  //get all items from cart
  res.send('hello router!');
})

router.get('/:id', (req, res, next) => {
  res.json({
    name: 'hello json'
  })
});



module.exports = router;