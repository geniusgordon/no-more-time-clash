var express = require('express');
var router = express.Router();
var scheduleApi = require('./schedule');
var machineApi = require('./machine');

router.use('/schedule', scheduleApi);
router.use('/machine', machineApi);

module.exports = router;

