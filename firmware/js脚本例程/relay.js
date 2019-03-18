var gpio = require('gpio');
var tim = require("timer");
var config={
  pin:12,
  dir:gpio.DIR_OUT,
  mode:gpio.PULLUP
};
var flag = 0;
var pin=gpio.open(config);
tim.setInterval(function() {
    if(flag){pin.write(0); flag=0}
    else {pin.write(1); flag=1}
    print(flag);
  }, 1000);
print("js execute done!");