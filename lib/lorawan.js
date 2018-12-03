var util = require('util');
var EventEmitter = require('events');
var SerialPort = require('serialport');
const Delimiter = require('@serialport/parser-delimiter')
	const RN2483 = require('./commands.js');

// LoRaWAN constructor
function LoRaWAN(config) {
	EventEmitter.call(this);

	this.config = config;
	this.isListening = false;
	this.callbackStack = [];
	this._initSerial();
}

util.inherits(LoRaWAN, EventEmitter);

LoRaWAN.prototype.init = function () {
	var me = this;

	if (me.serialConnection.isOpen) {
		me.emit('open' + me.config.id);
		me.initRN2483();
	} else {
		me.serialConnection.open(function (err) {
			if (err) {
				me.emit('error' + me.config.id, err);
			} else {
				me.emit('open' + me.config.id);
				me.initRN2483();
			}
		});
	}
};

LoRaWAN.prototype.initRN2483 = function () {
	var me = this;
	var async = require('async');
	var cmds_sequence = init_sequence_p2p;

	console.log(cmds_sequence);

	async.eachSeries(cmds_sequence, function (item, next) {
		me.send(item, function (err, data) {
			if (me.responseOK(item, data))
				next();
			else
				return;
		})
	},
		function (err) {
		if (err == null)
			console.log('Initialisation OK !');
		else
			console.log('Error on initialization: ' + err);
	});
}

LoRaWAN.prototype.searchCmd = function (cmd) {
	while ((typeof RN2483.commands[cmd] == 'undefined') && (cmd != ''))
		cmd = cmd.substr(0, cmd.lastIndexOf(" "));
	return cmd;
}

LoRaWAN.prototype.searchResponse = function (cmd, response) {
	var tab = response.toString('ascii').split(' ');
	var i = 1;
	var answer = tab[0];
	while ((typeof RN2483.commands[cmd][answer] == 'undefined') && (i <= tab.length)) {
		answer = answer + " " + tab[i];
		console.log(answer);
		i = i + 1;
	}
	if (i > tab.length)
		return '';
	else
		return answer;
}

LoRaWAN.prototype.responseOK = function (cmd, response) {
	console.log('Verify CMD = ' + cmd + ' with RSP = ' + response);
	cmd = this.searchCmd(cmd);
	response = this.searchResponse(cmd, response);
	// Should check response
	if (cmd != '')
		switch (RN2483.commands[cmd][response]) {
		case 0:
			return true;
		default:
			return false;
		}
}

LoRaWAN.prototype._initSerial = function () {
	var me = this;
	this.serialConnection = new SerialPort(this.config.serialPort, {
			autoOpen: false,
			lock: this.config.lock,
			baudRate: this.config.baudRate,
			dataBits: this.config.dataBits,
			stopBits: this.config.stopBits,
			parity: this.config.parity,
			rtscts: this.config.rtscts,
			xon: this.config.xon,
			xoff: this.config.xoff,
			xany: this.config.xany,
			highWaterMark: this.config.bufferSize, // buffersSize
			//parser: this.lorawanAPI.rawParser(),
			platformOptions: {
				vmin: this.config.vmin,
				vtime: this.config.vtime
			}
		});
	this.serialConnection.parser = this.serialConnection.pipe(new Delimiter({
				delimiter: '\r\n'
			}));

	this.serialConnection.on('disconnect', function () {
		me.emit('disconnect' + me.config.id);
	});
};

LoRaWAN.prototype.close = function (cb) {
	var me = this;
	// me.lorawanAPI.removeAllListeners('frame_object');
	me.removeAllListeners('open' + me.config.id);
	me.removeAllListeners('data' + me.config.id);
	me.removeAllListeners('sent' + me.config.id);
	me.removeAllListeners('error' + me.config.id);
	me.removeAllListeners('disconnect' + me.config.id);
	if (me.serialConnection.isOpen) {
		me.serialConnection.close(cb);
	}
};

var init_sequence_p2p = [
	'mac pause',
	'radio set pwr ' + '15',
	'radio set freq ' + '868100000',
	'radio set sf ' + 'sf12',
	'radio set cr ' + '4/5',
	'radio set bw ' + '125',
	'radio set crc ' + 'on'
];

LoRaWAN.prototype.listen = function () {
	var me = this;
	if (!me.isListening) {
		me.isListening = true;
		this.serialConnection.parser.on('data', function (data) {
			console.log('DATA: ' + data)
			// if stack is not empty, we receive a response to a sent command
			if (me.callbackStack.length > 0) {
				var item = me.callbackStack.pop();
				var cmd = item.data;
				var callback = item.callback;
				console.log('Answer to "' + cmd + '": ' + data.toString('ascii'));
				callback(null, data);
			} else {
				// else we receive a data from radio to send
				console.log("Received without call: " + data.toString('ascii'));
				// MUST analyse radio rx or radio err to know if its ok or timeout
				me.emit('data' + me.config.id, data);
			}
		}).on('error', function (err) {
			me.emit('error' + me.config.id, err);
		});
	}
};

LoRaWAN.prototype.transmit = function (cmd) {
	var me = this;
	me.send(cmd, function (err, data) {
		if (me.responseOK(cmd, data)) {
			console.log('CMD: ' + cmd + ' result = ' + data);
		}
	});
}

LoRaWAN.prototype.send = function (data, callback) {
	var me = this;
	if (me.serialConnection.isOpen) {
		try {
			console.log("Send command " + data);

			me.serialConnection.write(data + "\r\n", function (err, res) {
				if (err) {
					//TODO: this is not right with our protocol
					// I'm assuming that if there is an error on the line
					// you won't receive serial data for the request. Hence
					// we remove the callback from the stack.
					me.callbackStack.splice(me.callbackStack.indexOf({
							data,
							callback
						}), 1);
					callback(err);
				};
			});
			me.callbackStack.unshift({
				data,
				callback
			});
			me.emit('sent' + me.config.id);
		} catch (error) {
			me.emit('error' + me.config.id, error);
		}
	}
};

module.exports = LoRaWAN;
