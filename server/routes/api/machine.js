var express = require('express');
var router = express.Router();
var machineModel = require('../../models/machine');

/* GET users listing. */
router.get('/', (req, res) => {
  machineModel.find({}, (err, machines) => {
    res.json(machines);
  });
});

module.exports = router;

