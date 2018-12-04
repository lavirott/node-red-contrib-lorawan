# node-red-contrib-lorawan

```html
   This module is under active development. You can test it at you own risk ! ;).
```

Node-RED modules to address the LoRaWAN RN2483 and RN2903 radio modules.

[RN2483](https://www.microchip.com/wwwproducts/en/RN2483) and [RN2903](https://www.microchip.com/wwwproducts/en/RN2903) are module produced by [Microchip](https://www.microchip.com/). You can read the ["RN2483 Command Reference User's Guide"](https://ww1.microchip.com/downloads/en/DeviceDoc/40001784B.pdf) and the ["RN2903 Command Reference Users Guide"](http://ww1.microchip.com/downloads/en/DeviceDoc/40001811A.pdf) to understand the protocol used over the serial connexion.

The node currently only address the LoRaWAN P2P protocol with hard coded values. But next release should enable the possible to configure the setup process of the chip.

The code has been tested with the ["Raspberry Pi to Arduino Shield Connection Bridge"](https://www.cooking-hacks.com/documentation/tutorials/raspberry-pi-to-arduino-shields-connection-bridge) and a [LoRaWAN RN2483 radio module](https://www.cooking-hacks.com/documentation/tutorials/lorawan-for-arduino-raspberry-pi-waspmote-868-900-915-433-mhz)

<img src="https://www.cooking-hacks.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/r/a/raspberry_arduino_shield_600px.1471337569.png" alt="Raspberry Pi to Arduino Shields Connection Bridge" width="350"/> <img src="https://www.cooking-hacks.com/media/cooking/images/documentation/tutorial_kit_lorawan/lorawan_representative_big.jpg" alt="LoRaWAN RN2483 radio module" width="350"/>

You can have a look to the [ArduPi github repository](https://github.com/lavirott/arduPi) to have usage samples without Node-RED.
