var express = require('express');
var moment = require('moment');
var router = express.Router();
var scheduleModel = require('../../models/schedule');
var machineModel = require('../../models/machine');

function getDate(year, month, day) {
  const dateString = `${year}/${month}/${day} 00:00 +0800`;
  return moment(dateString, 'YYYY/MM/DD HH:mm +-HHmm');
}

/* GET users listing. */
router.get('/', (req, res) => {
  scheduleModel.find({}, (err, schedules) => {
    res.json(schedules);
  });
});

router.get('/:year/:month/:day', (req, res) => {
  var machine = req.params.machine;
  var date = getDate(req.params.year, req.params.month, req.params.day);

  if (!date.isValid()) {
    res.json({});
    return;
  }

  var prev = moment(date);
  prev.subtract(1, 'days');
  var next = moment(date);
  next.add(1, 'days');

  var result = {
    prev: prev.format('YYYY/MM/DD'),
    curr: date.format('YYYY/MM/DD'),
    next: next.format('YYYY/MM/DD'),
    schedules: {},
  };
  machineModel.find({}, (err, machines) => {
    var count = 0;
    machines.forEach((machine) => {
      scheduleModel.aggregate([{
        $match: {
          time: date.toDate(),
          machine: machine._id,
        },
      }], (err, schedules) => {
        result.schedules[machine.name] = schedules;
        count++;
        if (count == machines.length) {
          res.json(result);
        }
      });
    });
  });
});

module.exports = router;

