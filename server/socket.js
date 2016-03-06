module.exports = function(store) {
  var _io = require('socket.io')();
  var io = {
    io: require('./config/socket')(_io, store),
    listen(server) {
      this.io.listen(server);
    },
    on(e, fn) {
      this.io.on(e, fn);
    },
    emit(tag, data) {
      this.io.emit(tag, data);
    },
  };

  return io;
};

