var express = require('express');
var router = express.Router();
var scheduleApi = require('./schedule');

router.use('/schedule', scheduleApi);

module.exports = router;

