var util = require('util');
var EventEmitter = require('events');
var LoRaWAN = require('./lorawan.js');

function LoRaWANPoolManager(poolRefreshTime) {
  EventEmitter.call(this);
  var me = this;
  this.openConnections = {};
  this.disconnected = {};
  this.poolRefreshTime = poolRefreshTime || 10000;
}

util.inherits(LoRaWANPoolManager, EventEmitter);

LoRaWANPoolManager.prototype.start = function () {
  var me = this;
  if (!this.reconnectionsHandler) {
    this.reconnectionsHandler = setInterval(function () {
      var keys = Object.keys(me.disconnected);
      keys.forEach(function (id) {
        me.openConnections[id].init();
      });
    }, me.poolRefreshTime);
  }
};

LoRaWANPoolManager.prototype.stop = function () {
  if (this.reconnectionsHandler) {
    clearInterval(this.reconnectInterval);
    this.reconnectInterval = null;
  }
};

LoRaWANPoolManager.prototype.get = function (nodeId, config) {
  var me = this;
  var loraWAN = this.openConnections[config.id];
  
  if (!loraWAN) {
    loraWAN = new LoRaWAN(config);
    me.openConnections[config.id] = me.disconnected[config.id] = loraWAN;

    loraWAN.on('disconnect' + config.id, function () {
      me.disconnected[config.id] = true;
    });

    loraWAN.on('open' + config.id, function () {
      delete me.disconnected[config.id];
    });

  }
  me.emit('lorawan' + nodeId, loraWAN);
};

LoRaWANPoolManager.prototype.cleanUp = function (cb) {
  var loraWANKeys = Object.keys(this.openConnections);
  var me = this;
  this.stop();
  if (loraWANKeys.length > 0) {
    var loraWAN = this.openConnections[loraWANKeys[0]];
    delete this.openConnections[loraWANKeys[0]];
    loraWAN.close(function (err) {
      me.cleanUp(cb);
    });
  } else {
    cb();
  }
};

module.exports = LoRaWANPoolManager;
