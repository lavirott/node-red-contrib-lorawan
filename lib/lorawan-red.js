module.exports = function (RED) {

	var LoRaWANPoolManager = require('./lorawanpool.js');
	var loraWANPoolManager = new LoRaWANPoolManager();
	loraWANPoolManager.start();

	// LoRaWAN Configuration Node shared by LoRaWAN nodes
	function lorawanConfigNode(n) {
		RED.nodes.createNode(this, n);
		this.rawFrames = n.rawFrames || false;
		this.mode = parseInt(n.mode) || 2;
		this.modeP2P_radioPwr = parseInt(n.modeP2P_radioPwr) || 15;
		this.modeP2P_radioFreq = parseInt(n.modeP2P_radioFreq) || 868100000;
		this.modeP2P_radioSf = n.modeP2P_radioSf || 'sf12';
		this.modeP2P_radioCr = n.modeP2P_radioCr || '4/5';
		this.modeP2P_radioBw = parseInt(n.modeP2P_radioBw) || 125;
		this.modeP2P_radioCRC = n.modeP2P_radioCRC || 'on';
		this.serialPort = n.serialPort;
		this.lock = n.lock || true;
		this.baudRate = parseInt(n.baudRate) || 57600;
		this.dataBits = parseInt(n.dataBits) || 8;
		this.stopBits = parseInt(n.stopBits) || 1;
		this.parity = n.parity || 'none';
	}

	// LoRaWAN node for sending data over serial connection (TX)
	function lorawanTx(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		node.loraWANConfig = RED.nodes.getNode(config.loraWAN);
		node.pool = loraWANPoolManager;

		if (!node.loraWANConfig) {
			node.status({
				fill: "yellow",
				shape: "dot",
				text: "missing config"
			});
			return;
		}

		// Pool delivers an LoRaWAN to the node
		node.pool.on('lorawan' + node.id, function (loraWAN) {
			node.loraWAN = loraWAN;

			// Subscribe to the distinct events from loraWAN
			node.loraWAN.on('open' + node.loraWANConfig.id, function () {
				node.status({
					fill: "green",
					shape: "dot",
					text: "ready"
				});
			});

			node.loraWAN.on('sent' + node.loraWANConfig.id, function () {
				setTimeout(function () {
					node.status({
						fill: "green",
						shape: "dot",
						text: "ready"
					});
				}, 200);
			});

			node.loraWAN.on('disconnect' + node.loraWANConfig.id, function () {
				node.status({
					fill: "yellow",
					shape: "dot",
					text: "connection lost"
				});
			});

			node.loraWAN.on('error' + node.loraWANConfig.id, function (err) {
				node.status({
					fill: "red",
					shape: "ring",
					text: "there is an error"
				});
				node.error("Error ocurred, see console for details.");
				console.error(err.message);
			});

		});

		// Get LoRaWAN from the Pool, then events start firing....
		node.pool.get(node.id, node.loraWANConfig);

		// When data arrives to the node, will send with LoRaWAN
		node.on('input', function (msg) {
			node.status({
				fill: "blue",
				shape: "dot",
				text: "sending"
			});
			node.loraWAN.transmit(msg.payload);
		});

		// Clean open LoRaWAN connections
		node.on('close', function (done) {
			node.status({
				fill: "gray",
				shape: "ring",
				text: "closing"
			});
			node.pool.removeAllListeners('lorawan' + node.id);
			loraWANPoolManager.cleanUp(function (err) {
				done();
			});
			node.pool = node.loraWAN = null;
		});

	}

	// LoRaWAN node to Receive data (RX)
	function lorawanRx(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		node.loraWANConfig = RED.nodes.getNode(config.loraWAN);
		node.pool = loraWANPoolManager;

		if (!node.loraWANConfig) {
			node.status({
				fill: "yellow",
				shape: "dot",
				text: "missing config"
			});
			return;
		}

		// Pool delivers an LoRaWAN to the node
		node.pool.on('lorawan' + node.id, function (loraWAN) {
			node.loraWAN = loraWAN;

			// Subscribe to the distinct events from loraWAN
			node.loraWAN.on('open' + node.loraWANConfig.id, function () {
				node.status({
					fill: "green",
					shape: "dot",
					text: "listening"
				});
				node.loraWAN.listen();
			});

			node.loraWAN.on('data' + node.loraWANConfig.id, function (data) {
				node.status({
					fill: "green",
					shape: "dot",
					text: "receiving data"
				});
				node.send({
					payload: data
				});
				setTimeout(function () {
					node.status({
						fill: "green",
						shape: "dot",
						text: "listening"
					});
				}, 200);
			});

			node.loraWAN.on('disconnect' + node.loraWANConfig.id, function () {
				node.status({
					fill: "yellow",
					shape: "dot",
					text: "connection lost"
				});
			});

			node.loraWAN.on('error' + node.loraWANConfig.id, function (err) {
				node.status({
					fill: "red",
					shape: "ring",
					text: "there is an error"
				});
				node.error("Error ocurred, see console for details.");
				console.error(err.message);
			});

		});

		// Get LoRaWAN from the Pool, then events start firing....
		node.pool.get(node.id, node.loraWANConfig);

		// Clean open LoRaWAN connections
		node.on('close', function (done) {
			node.status({
				fill: "gray",
				shape: "ring",
				text: "closing"
			});
			node.pool.removeAllListeners('lorawan' + node.id);
			node.pool.cleanUp(function (err) {
				done();
			});
			node.pool = node.loraWAN = null;
		});
	}

	RED.nodes.registerType("lorawan-tx", lorawanTx);
	RED.nodes.registerType("lorawan-rx", lorawanRx);
	RED.nodes.registerType("lorawan-config", lorawanConfigNode);

};
