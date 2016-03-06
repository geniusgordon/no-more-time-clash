var express = require('express');
var router = express.Router();
var scheduleModel = require('../../models/schedule');

/* GET users listing. */
router.get('/', (req, res) => {
  scheduleModel.find({}, (err, schedules) => {
    res.json(schedules);
  });
});

router.get('/:year/:month/:day', (req, res) => {
  res.json(req.params.year);
});

module.exports = router;

