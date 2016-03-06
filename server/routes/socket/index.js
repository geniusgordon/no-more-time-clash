var scheduleModel = require('../../models/schedule');
var machineModel = require('../../models/machine');

function borrow(machine, data, callback) {
  scheduleModel.findOne({
    date: data.date,
    slog: data.slot,
    machine: machine._id,
  }, (err, schedule) => {
    if (err || schedule) {
      callback(false);
      return;
    }
    var s = new scheduleModel({
      fbID: data.fbID,
      date: data.date,
      slot: data.slot,
      machine: machine,
    });
    s.save((err) => {
      callback(s);
    });
  });
}

function cancel(machine, data, callback) {
  scheduleModel.findOne({
    date: data.date,
    slot: data.slot,
    machine: machine._id,
  }, (err, schedule) => {
    if (err || !schedule) {
      callback(false);
      return;
    }
    if (schedule.fbID !== data.fbID) {
      callback(false);
      return;
    }
    schedule.remove((err) => {
      callback(schedule);
    });
  });
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('socket client connected');

    socket.on('disconnect', () => {
      console.log('socket client disconnected');
    });

    socket.on('borrow', (data, callback) => {
      console.log('borrow:', data);
      if (!data.fbID) {
        callback(false);
        return;
      }
      machineModel.findOne({
        name: data.machine,
      }, (err, machine) => {
        if (err || !machine) {
          callback(false);
          return;
        }
        borrow(machine, data, (schedule) => {
          if (schedule) {
            io.emit('other borrow', {
              machine: data.machine,
              schedule,
            });
            callback(true);
            return;
          }
          callback(false);
        });
      });
    });

    socket.on('cancel', (data, callback) => {
      console.log('cancel:', data);
      machineModel.findOne({
        name: data.machine,
      }, (err, machine) => {
        if (err || !machine) {
          callback(false);
          return;
        }
        cancel(machine, data, (schedule) => {
          if (schedule) {
            io.emit('other cancel', {
              machine: data.machine,
              schedule,
            });
            callback(true);
            return;
          }
          callback(false);
        });
      });
    });
  });
}

