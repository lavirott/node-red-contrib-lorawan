var commands = {
	"sys reset": {
		"RN2483": 0,
		"RN2903": 0
	},
	"sys factoryRESET": {
		"RN2483": 0,
		"RN2903": 0
	},
	"sys get hweui": {
		"invalid_param": 1
	},
	"sys get vdd": {
		"invalid_param": 1
	},
	"sys get ver": {
		"RN2483": 0,
		"RN2903": 0,
		"invalid_param": 1
	},
	"mac reset": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac set deveui": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get deveui": {
		"invalid_param": 1
	},
	"mac set devaddr": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get devaddr": {
		"invalid_param": 1
	},
	"mac set nwkskey": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac set appeui": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get appeui": {
		"invalid_param": 1
	},
	"mac set appkey": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac set appskey": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac set pwridx": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get pwridx": {
		"invalid_param": 1
	},
	"mac set dr": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get dr": {
		"ok": 0
	},
	"mac save": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac join abp": {
		"ok": 0,
		"invalid_param": 1,
		"keys_not_init": 2,
	},
	"mac join otaa": {
		"ok": 0,
		"invalid_param": 1,
		"keys_not_init": 2,
	},
	"mac tx cnf": {
		"ok": 0,
		"invalid_param": 1,
		"not_joined": 3,
	},
	"mac tx uncnf": {
		"ok": 0,
		"invalid_param": 1,
		"not_joined": 3,
	},
	"mac set adr": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get adr": {
		"on": 0,
		"off": 0,
		"invalid_param": 1
	},
	"mac get dcycleps": {
		"invalid_param": 1
	},
	"mac pause": {
		"4294967245": 0,
		"invalid_param": 1
	},
	"mac resume": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac set ch freq": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get ch freq": {
		"invalid_param": 1
	},
	"mac set ch dcycle": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get ch dcycle": {
		"invalid_param": 1
	},
	"mac set ch drrange": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get ch drrange": {
		"invalid_param": 1
	},
	"mac set ch status": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get ch status": {
		"on": 0,
		"off": 0,
		"invalid_param": 1
	},
	"mac set retx": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get retx": {
		"invalid_param": 1
	},
	"mac get band": {
		"invalid_param": 1
	},
	"mac get mrgn": {
		"invalid_param": 1
	},
	"mac get gwnb": {
		"invalid_param": 1
	},
	"mac set upctr": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get upctr": {
		"invalid_param": 1
	},
	"mac set dnctr": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac set linkchk": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac get dnctr": {
		"invalid_param": 1
	},
	"radio tx": {
		"ok": 0,
		"invalid_param": 1,
		"busy": 4
	},
	"radio rx": {
		"ok": 0,
		"invalid_param": 1,
		"busy": 4
	},
	"radio cw on": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio cw off": {
		"RN2483": 0,
		"RN2903": 0,
		"invalid_param": 1
	},
	"radio get snr": {
		"invalid_param": 1
	},
	"radio set sf": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get sf": {
		"invalid_param": 1
	},
	"radio set pwr": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get pwr": {
		"invalid_param": 1
	},
	"radio set mod": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get mod": {
		"invalid_param": 1
	},
	"radio set freq": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get freq": {
		"invalid_param": 1
	},
	"radio set rxbw": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get rxbw": {
		"invalid_param": 1
	},
	"radio set bitrate": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get bitrate": {
		"invalid_param": 1
	},
	"radio set fdev": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get crc": {
		"on": 0,
		"off": 0,
		"invalid_param": 1
	},
	"radio set crc": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio set prlen": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get prlen": {
		"invalid_param": 1
	},
	"radio set cr": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get cr": {
		"invalid_param": 1
	},
	"radio set wdt": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get wdt": {
		"invalid_param": 1
	},
	"radio set bw": {
		"ok": 0,
		"invalid_param": 1
	},
	"radio get bw": {
		"invalid_param": 1
	},
	"mac set rx2": {
		"ok": 0,
		"invalid_param": 1
	},
	"mac set rxdelay1": {
		"ok": 0,
		"invalid_param": 1
	}
}
module.exports = {
	commands
};
