const express = require('express');
const router = express.Router();

const redis = require('redis');

/* GET home page. */
router.post('/subscribe', function(req, res, next) {
  const data = req.body;
});

router.post('/publish', function(req, res, next) {

});

module.exports = router;
